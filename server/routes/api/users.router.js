const router = require('express').Router();
const User = require('../../models/user');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const passportJwtAuth = require('../../middleware/passport-jwt-auth');
const checkAdmin = require('../../middleware/checkAdmin');
const mailer = require('../../libs/mailer');
const checkMongoId = require('../../middleware/check-mongoId');
const resMsg = require('../../utils/res-msg');


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


router.post('/register', (req, res, next) => {
  const password = req.body.password;
  if (!password || password.length < 6) {
    return res.status(400).json({
      error: {
        message: 'Password must be greater or equal 6 symbols'
      }
    });
  }
  User.createUser({
    username: req.body.username,
    email: req.body.email,
    password: password
  })
    .then(user => {
      User.confirmEmail(user._id);
      res.json({
        success: true,
        message: 'You have successfully registered'
      });
    }).catch(err => next(err));
});

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
    User.findUserByEmail(req.body.email)
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

router.get('/profile', passportJwtAuth, (req, res) => {
  const user = Object.assign({}, req.user);
  delete user.role;
  res.json({
    success: true,
    profile: user
  });
});

router.get('/admin', passportJwtAuth, checkAdmin, (req, res, next) => {
  res.json({
    success: true,
    admin: true
  });
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

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