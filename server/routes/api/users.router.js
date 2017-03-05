/**
 * Module dependencies
 */

const
  router = require('express').Router(),
  User = require('../../models/user'),
  Confirm = require('../../models/confirm-email'),
  config = require('../../config/config'),
  path = require('path'),
  jwt = require('jsonwebtoken'),
  passportJwtAuth = require('../../middleware/passport-jwt-auth'),
  passport = require('../../libs/passport'),
  checkAdmin = require('../../middleware/checkAdmin'),
  pug = require('pug'),
  mailer = require('../../libs/mailer'),
  checkMongoId = require('../../middleware/check-mongoId'),
  {notFound} = require('../../utils/res-msg'),
  {registerValidator, objectIdValidator} = require('../../utils/validation-utils'),
  _ = require('lodash');

/**
 *GET all users
 */

router.get('/', (req, res, next) => {
  User.find()
    .lean()
    .then(users => {
      res.json({
        users: users
      });
    }).catch(err => next(err));

});

/**
 *Registration route
 */

router.post('/register', (req, res, next) => {
  const errors = registerValidator(req.body);
  if (errors.length) {
    return res.status(400).json({
      error: {
        errors: errors
      }
    });
  }
  User.findUserByQuery({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({
          error: {
            message: `Email ${user.email} is already registered`
          }
        });
      }
      User.createLocalUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(user => {
        // User.confirmEmail(user._id);
        res.json({
          message: 'You have successfully registered'
        });
      });
    }).catch(err => next(err));

});

/**
 *
 *Login route (give token to user)
 */

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: 'Email or Password is empty'
        }
      });
    }

    User.findUserByQuery({'local.email': req.body.email})
      .select('+local.password')
      .select('-updatedAt -createdAt')
      .lean()
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: {
              message: 'User not found'
            }
          });
        }
        User.checkPassword(req.body.password, user.local.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(403).json({
                error: {
                  message: 'Invalid password'
                }
              });
            }

            user.local = _.omit(user.local, ['password']);

            jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
              if (err) {
                return next(err);
              }
              return res.json({
                jwt: token,
                user
              });
            });

          });
      }).catch(err => next(err));
  }
);

/**
 * GET Google OAuth2
 */

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/login/google/callback', passport.authenticate('google', {session: false}), (req, res, next) => {
  let user = req.user.toObject();
  user = _.omit(user, ['createdAt', 'updatedAt', 'role']);

  jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
    if (err) {
      return next(err);
    }
    return res.json({
      jwt: token,
      user: user
    });
  });
});

/**
 * GET Facebook OAuth
 */

router.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/login/facebook/callback', passport.authenticate('facebook', {session: false}), (req, res, next) => {
  let user = req.user.toObject();
  user = _.omit(user, ['createdAt', 'updatedAt', 'role']);

  jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
    if (err) {
      return next(err);
    }
    return res.json({
      jwt: token,
      user: user
    });
  });
});

/**
 *Confirm Email
 */
router.post('/send', passportJwtAuth, (req, res, next) => {
  //confirm?userId&token
  const {email, confirmed, username}=req.user.local;
  if (confirmed) {
    return res.json({
      message: 'Email has already verificated'
    });
  }
  if (email) {
    Confirm.createConfirm(req.user._id)
      .then(confirm => {
        const query = [
          `id=${confirm.userId}`,
          `confirmToken=${confirm.confirmToken}`].join('&');

        const url = `${config.server.host}:${config.server.port}${config.server.apiRoute}/users/confirm?${query}`;
        //TODO:Send Email
        let mailOptions = config.mailer.mailOptions;
        mailOptions.html = pug.renderFile(path.join(req.app.get('views'), 'confirm-email.pug'), {
          url,
          email,
          username,
          cache: true
        });
        mailOptions.to = 'vetalpro.exe@gmail.com';
        mailer.sendMail(mailOptions, (err, info) => {
          if (err) {
            throw err;
          }
          return res.json({
            confirm: confirm,
            url: url,
            info: info
          });
        });

      })
      .catch(err => next(err));
  } else {
    res.status(400).json({
      error: {
        message: 'Local email is empty'
      }
    });
  }


});

router.get('/confirm', (req, res, next) => {
  const query = req.query;
  if (!query.id || !query.confirmToken || !objectIdValidator(query.id)) {
    return res.status(400).json({
      error: {
        message: 'Bad Request'
      }
    });
  }
  Confirm.findConfirm(query.id, query.confirmToken)
    .then(confirm => {
      if (!confirm) {
        return res.status(400).json({
          error: {
            message: 'Token TTL expired. Please resend verification email again'
          }
        });
      }
      User.findUserById(confirm.userId)
        .then(user => {
          if (!user) {
            return notFound(res, 'User not found');
          }
          user.local.confirmed = true;
          user.save().then(user => {
            return Confirm.removeConfirm(user._id, query.confirmToken);
          }).then(() => {
            res.json({
              message: 'You verificate your email'
            });
          });
        }).catch(err => next(err));
    });
});

/**
 *Profile route for auth users
 */

router.get('/profile', passportJwtAuth, (req, res) => {
  const user = _.assign({}, req.user);
  res.json({
    profile: _.omit(user, ['role', 'createdAt', 'updatedAt'])
  });
});

/**
 * Admin route for users with role 'admin'
 */

router.get('/admin', passportJwtAuth, checkAdmin, (req, res, next) => {
  res.json({
    success: true,
    admin: true
  });
});

/**
 * Logout (isn't working yet)
 */

router.get('/logout', (req, res) => {
  res.redirect('/');
});

/**
 * GET User by ID with check valid mongoID middleware
 */

router.get('/:id', checkMongoId, (req, res, next) => {
  const userId = req.params.id;
  User.findUserById(userId)
    .lean()
    .then(user => {
      if (!user) {
        return notFound(res, 'User not found');
      }
      res.json({
        success: true,
        user: user
      });
    }).catch(err => next(err));
});

module.exports = router;