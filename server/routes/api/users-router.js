const
  router = require('express').Router(),
  User = require('../../models/user'),
  Confirm = require('../../models/confirm-email'),
  config = require('../../config'),
  path = require('path'),
  jwt = require('jsonwebtoken'),
  passportJwtAuth = require('../../middleware/passport-jwt-auth'),
  passport = require('../../libs/passport'),
  checkAdmin = require('../../middleware/checkAdmin'),
  pug = require('pug'),
  mailer = require('../../libs/mailer'),
  checkMongoId = require('../../middleware/check-mongoId'),
  {notFound} = require('../../utils/res-msg'),
  {HttpError} = require('../../utils/errors'),
  {registerValidator, objectIdValidator} = require('../../utils/validation-utils'),
  _ = require('lodash');

/**
 *GET all users
 */
/**
 @api {get} /users GET All Users
 @apiVersion 0.1.0
 @apiName GetAllUsers
 @apiGroup User
 @apiHeader {String} Authorization Users unique JWT.
 @apiHeaderExample {json} Header-Example:
 {
   "Authorization": "JWT {token long string}"
 }

 @apiSuccess {Array} users Array of Users.

 @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "users": [
    {
      "_id": "58bae8b1082f5e2728bab169",
      "updatedAt": "2017-03-04T16:17:53.238Z",
      "createdAt": "2017-03-04T16:17:53.238Z",
      "local": {
        "email": "admin@gmail.com",
        "username": "admin",
        "confirmed": false
      },

    },
    {
      "_id": "58bae8b1082f5e2728bab168",
      "updatedAt": "2017-03-04T22:59:34.537Z",
      "createdAt": "2017-03-04T16:17:53.226Z",
      "local": {
        "email": "test2@gmail.com",
        "username": "name2",
        "confirmed": true
      },
      "google": {
        "id": "23423423423",
        "token": "sadkaskdjk4h5j34hj5j6h54j6j45",
        "name": "Vasya Ivanov",
        "email": "vasya.exe@gmail.com"
      }
    }

 }

 @apiError {Object} error Error Object.
 @apiError {String} error.message message of the error.

 @apiErrorExample Error-Response:
 HTTP/1.1 404 Not Found
 {
   "error": {
      "message": "User not found"
    }
 }

 */


router.delete('/:id', checkMongoId, passportJwtAuth, checkAdmin, (req, res, next) => {
  const userId = req.params.id;
  User.deleteById(userId)
    .then(result => {
      if (result) {
        return res.json({
          message: 'Пользователь удален',
          result: result
        });
      }
      res.status(404).json({
        message: 'Пользователь не найден',
      });
    })
    .catch(err => next(err));
});


/**
 @api {post} /users/register Registration
 @apiVersion 0.1.0
 @apiName UserRegister
 @apiGroup User

 @apiParam {String} email Email.
 @apiParam {String} password Password.
 @apiParam {String} username Full Username.

 @apiParamExample {json} Request-Example:
 {
   "email": "user@gmail.com",
   "password": "123456",
   "username": "user"
 }

 @apiSuccess {Object} local Local Strategy.
 @apiSuccess {String} local.email email of the User.

 @apiSuccessExample Success-Response:
 HTTP/1.1 201 OK
 {
   "message": "You have successfully registered"
 }

 @apiError {Object} error Error Object.
 @apiError {Array} error.errors Array of errors.
 @apiError {String} error.message Error message.

 @apiErrorExample Validation Error:
 HTTP/1.1 400 Bad Request
 {
   "error": {
      "errors": [
        {
          "username": "Username must be filled"
        },
        {
          "email": "Email must be filled"
        },
        {
          "password": "Password must be filled"
        }
      ]
    }
 }
 @apiErrorExample Email Error:
 HTTP/1.1 403 Forbidden
 {
   "error": {
      "message": "Email user@gmail.com is already registered"
    }
 }

 */
router.post('/registration', (req, res, next) => {
  console.log(req.body);
  const errors = registerValidator(req.body);
  if (errors.length) {
    return res.status(400).json({
      error: {
        errors: errors
      }
    });
  }
  User.findUserByQuery({'local.email': req.body.email})
    .then(user => {
      if (user) {
        res.status(403).json({
          error: {
            message: `Email ${user.local.email} is already registered`
          }
        });
        return null;
      }
      return User.createLocalUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
    })
    .then(user => {
      if (user) {
        res.status(201).json({
          message: 'You have successfully registered'
        });
      }
    }).catch(err => next(err));

});

/**
 @api {post} /users/login Login
 @apiVersion 0.1.0
 @apiName UserLogin
 @apiGroup User

 @apiParam {String} email Email.
 @apiParam {String} password Password.

 @apiParamExample {json} Request-Example:
 {
   "email": "user@gmail.com",
   "password": "123456"
 }

 @apiSuccess {String} jwt JWT token.
 @apiSuccess {Object} user User Object.
 @apiSuccess {String} user.email Email of the user.
 @apiSuccess {String} user.username Username of the user.

 @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "jwt": "jwt token",
   "user": {
      "username": "user",
      "email": "user@gmail.com"
   }
 }

 @apiError {Object} error Error Object.
 @apiError {String} error.message Error message.

 @apiErrorExample Validation Error:
 HTTP/1.1 400 Bad Request
 {
   "error": {
      "message": "Email or Password is empty"
    }
 }

 @apiErrorExample Not Found Error:
 HTTP/1.1 404 Not Found
 {
   "error": {
      "message": "User not found"
    }
 }

 @apiErrorExample Invalid Password Error:
 HTTP/1.1 403 Forbidden
 {
   "error": {
      "message": "Invalid password"
    }
 }

 */

router.post('/login', (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: 'Пустой email или пароль.'
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
              message: 'Пользователь не найден.'
            }
          });
        }
        User.checkPassword(req.body.password, user.local.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(403).json({
                error: {
                  message: 'Неправильный пароль'
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
 @api {get} /users/login/google Google OAuth
 @apiVersion 0.1.0
 @apiName UserGoogleOAuth
 @apiGroup User

 @apiSuccess {String} jwt JWT token.
 @apiSuccess {Object} user User Object.
 @apiSuccess {String} user.email Email of the user.
 @apiSuccess {String} user.username Username of the user.

 @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "jwt": "jwt token",
   "user": {
      "google":{
        "name": "user",
        "email": "user@gmail.com"
      }

   }
 }

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
/**
 @api {post} /users/send Email Confirm
 @apiVersion 0.1.0
 @apiName UserEmailConfirm
 @apiGroup User

 @apiHeader {String} Authorization Users unique JWT.
 @apiHeaderExample {json} Header-Example:
 {
   "Authorization": "JWT {token long string}"
 }

 @apiSuccess {String} jwt JWT token.
 @apiSuccess {Object} user User Object.
 @apiSuccess {String} user.email Email of the user.
 @apiSuccess {String} user.username Username of the user.

 @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "confirm":{
   },
   "url":"url",
   "info":"info"
 }

 @apiError {Object} error Error Object.
 @apiError {String} error.message Error message.

 @apiErrorExample AlreadyConfirm Error:
 HTTP/1.1 403 Bad Request
 {
   "error": {
      "message": "Email user@gmail.com has already verificated"
    }
 }

 @apiErrorExample LocalEmailError:
 HTTP/1.1 400 Bad Request
 {
   "error": {
      "message": "Local email is empty"
    }
 }

 */
router.post('/send', passportJwtAuth, (req, res, next) => {
  const {email, confirmed, username} = req.user.local;
  if (confirmed) {
    return res.status(403).json({
      error: {
        message: `Email ${email} has already verificated`
      }
    });
  }
  if (email) {
    Confirm.createConfirm(req.user._id)
      .then(confirm => {
        const query = [
          `id=${confirm.userId}`,
          `confirmToken=${confirm.confirmToken}`].join('&');

        const url = `${config.server.callbackUrl + config.server.apiRoute}/users/confirm?${query}`;

        let mailOptions = config.mailer.mailOptions;
        mailOptions.html = pug.renderFile(path.join(req.app.get('views'), 'confirm-email.pug'), {
          url,
          email,
          username,
          cache: true
        });
        mailOptions.to = email;
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
    return next(new HttpError(400, 'Bad Request'));
  }
  Confirm.findConfirm(query.id, query.confirmToken)
    .then(confirm => {
      if (!confirm) {
        throw new HttpError(403, 'Время токена истекло, либо Вы уже подтвердили свой email.');
      }
      return User.findUserById(confirm.userId);

    })
    .then(user => {
      if (!user) {
        throw new HttpError(404, 'Пользователь не найден.');
      }
      user.local.confirmed = true;
      return user.save();
    })
    .then(user => {
      return Confirm.removeConfirm(user._id, query.confirmToken);
    })
    .then(() => {
      res.redirect(`${config.server.clientUrl}/profile`);
    })
    .catch(err => next(err));
});

/**
 *Profile route for auth users
 */
/**
 @api {get} /users/profile Profile
 @apiVersion 0.1.0
 @apiName UserProfile
 @apiGroup User

 @apiHeader {String} Authorization Users unique JWT.
 @apiHeaderExample {json} Header-Example:
 {
   "Authorization": "JWT {token long string}"
 }

 @apiSuccess {Object} profile User profile Object.

 @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "profile":{
      "username": "user",
      "email": "user@gmail.com"
   }
 }

 @apiError {Object} error Error Object.
 @apiError {String} error.message Error message.

 @apiErrorExample Error:
 HTTP/1.1 401 Unauthorized
 {
   "error": {
      "message": "Unauthorized"
    }
 }
 */

router.get('/profile', passportJwtAuth, (req, res) => {
  const user = _.assign({}, req.user);
  res.json(_.omit(user, ['createdAt', 'updatedAt']));
});

/**
 * Admin route for users with role 'admin'
 */

router.get('/is-admin', passportJwtAuth, (req, res) => {

  if (req.user && req.user.role) {
    if (req.user.role.indexOf('admin') > -1) {
      return res.json({
        isAdmin: true
      });
    }
  }
  res.json({
    isAdmin: false
  });
});


/**
 * Logout (isn't working yet)
 */

router.get('/logout', (req, res) => {
  res.redirect('/');
});

/**
 @api {get} /users/:id GET User by ID
 @apiVersion 0.1.0
 @apiName GetUser
 @apiGroup User
 @apiHeader {String} Authorization Users unique JWT.
 @apiHeaderExample {json} Header-Example:
 {
   "Authorization": "JWT {token long string}"
 }
 @apiParam {Number} id Users unique ID.
 @apiSuccess {Object} local Local Strategy.
 @apiSuccess {String} local.email email of the User.
 @apiSuccess {String} local.username name of the User.
 @apiSuccess {Object} google Google OAuth Strategy.
 @apiSuccess {String} google.email google email of the user.
 @apiSuccess {String} google.name google name of the user.
 @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "local": {
      "email": "name@gmail.com",
      "username": "name"
   },
   "google": {
      "email": "name@gmail.com",
      "name": "name"
   }

 }

 @apiError {Object} error Error Object.
 @apiError {String} error.message message of the error.

 @apiErrorExample Error-Response:
 HTTP/1.1 404 Not Found
 {
   "error": {
      "message": "User not found"
    }
 }

 */
router.get('/:id', checkMongoId, passportJwtAuth, checkAdmin, (req, res, next) => {
  const userId = req.params.id;
  User.findUserById(userId)
    .lean()
    .then(user => {
      if (!user) {
        return notFound(res, 'Пользователь не найден');
      }
      res.json(user);
    })
    .catch(err => next(err));
});

module.exports = router;
