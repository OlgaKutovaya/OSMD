/**
 * Module dependencies
 */

const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  config = require('../config/config'),
  User = require('../models/user');

/**
 * JWT config
 */
/**
 *
 * @type {{secretOrKey: string, jwtFromRequest}}
 */
const passportJwtConfig = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

/**
 * Passport basic config
 */

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findUserById(user._id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
    }).catch(err => done(err, null));
});

/**
 * Passport Local Strategy config
 */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findUserByEmail(email)
      .select('-password')
      .then(user => {
        if (!user) {
          return done(null, false, {message: 'Invalid username'});
        }
        User.checkPassword(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
          });
      })
      .catch(err => done(err));
  }
));

/**
 * Passport JWT Strategy config
 */

passport.use(new JwtStrategy(passportJwtConfig, (jwt_payload, done) => {
  User.findUserById(jwt_payload._id)
    .select('+role')
    .lean()
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => done(err, false));
}));

/**
 * Passport Google Strategy config
 */

passport.use(new GoogleStrategy(
  config.passport.googleOptions,
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate(
      {
        googleId: profile.id
      },
      {
        username: profile.displayName,
        email: profile.emails[0].value
      },
      (err, user) => cb(err, user));
  })
);


module.exports = passport;