const router = require('express').Router();
const User = require('../../models/user');
const passport = require('../../libs/passport');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.json({
        success: true,
        users
      });
    }).catch(err => next(err));

});

router.post('/register', (req, res, next) => {
  const newUser = new User(req.body);
  User.createUser(newUser)
    .then(user => {
      res.json({
        success: true,
        user
      })
    }).catch(err => next(err));
});

router.post('/login', (req, res, next) => {
    User.findUserByEmail(req.body.email)
      .select('+password')
      .select('-createdAt -updatedAt')
      .then(user => {
        if (!user) {
          res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
        User.checkPassword(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(403).json({
                success: false,
                message: 'Invalid password'
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

          })
      }).catch(err => next(err));
  }
);

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    success: true,
    profile: true
  })
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;