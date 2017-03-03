/**
 * Module dependencies
 */

const
  router = require('express').Router(),
  User = require('../../models/user'),
  config = require('../../config/config'),
  jwt = require('jsonwebtoken'),
  passportJwtAuth = require('../../middleware/passport-jwt-auth'),
  passport = require('../../libs/passport'),
  checkAdmin = require('../../middleware/checkAdmin'),
  // mailer = require('../../libs/mailer'),
  checkMongoId = require('../../middleware/check-mongoId'),
  resMsg = require('../../utils/res-msg'),
  {registerValidator} = require('../../utils/validation-utils'),
  _ = require('lodash');

/**
 *GET all users
 */

router.get('/', (req, res, next) => {
  User.find()
    .lean()
    .then(users => {
      res.json({
        success: true,
        users
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
      User.createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(user => {
        // User.confirmEmail(user._id);
        res.json({
          success: true,
          message: 'You have successfully registered'
        });
      }).catch(err => next(err));
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

    User.findUserByQuery({email: req.body.email})
      .select('+password')
      .select('-createdAt -updatedAt')
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: {
              message: 'User not found'
            }
          });
        }
        User.checkPassword(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(403).json({
                error: {
                  message: 'Invalid password'
                }
              });
            }
            user = user.toObject();
            delete user.password;

            jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
              if (err) {
                return next(err);
              }
              return res.json({
                success: true,
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
 *Confirm Email
 */
router.post('/confirm', (req, res, next) => {
  //confirm?userId&redirectUrl&token
  /*mailer.sendMail(config.mailer.mailOptions, (err, info) => {
   if (err) {
   return next(err);
   }
   console.log(info);
   res.json({
   success: true,
   info
   });
   });*/
});

/**
 *Profile route for auth users
 */

router.get('/profile', passportJwtAuth, (req, res) => {
  const user = Object.assign({}, req.user);
  delete user.role;
  res.json({
    profile: user
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
        return resMsg.notFound(res, 'User not found');
      }
      res.json({
        success: true,
        user: user
      });
    }).catch(err => next(err));
});

module.exports = router;