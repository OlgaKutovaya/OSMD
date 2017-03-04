/**
 * Module dependencies
 */

const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('../config/config'),
  User = require('../models/user'),
  googleAuthOtions = config.passport.googleAuthOptions,
  facebookAuthOtions = config.passport.facebookAuthOptions;

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
    User.findUserByQuery({email})
      .select('+password')
      .lean()
      .then(user => {
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }
        User.checkPassword(password, user.local.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
          }).catch(err => done(err));
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
        return done(null, false, {message: 'User not found'});
      }
      return done(null, user);
    })
    .catch(err => done(err, false));
}));

/**
 * Passport Google Strategy config
 */

passport.use(new GoogleStrategy(
  {
    clientID: googleAuthOtions.clientID,
    clientSecret: googleAuthOtions.clientSecret,
    callbackURL: googleAuthOtions.callbackURL
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate(
      {
        'google.id': profile.id
      },
      {
        'google.token': accessToken,
        'google.name': profile.displayName,
        'google.email': profile.emails[0].value
      },
      (err, user) => cb(err, user));
  })
);

passport.use(new FacebookStrategy(
  {
    clientID: facebookAuthOtions.clientID,
    clientSecret: facebookAuthOtions.clientSecret,
    callbackURL: facebookAuthOtions.callbackURL
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate(
      {
        'facebook.id': profile.id
      },
      {
        'facebook.token': accessToken,
        'facebook.name': profile.displayName,
        // 'facebook.email': profile.emails[0].value
      },
      (err, user) => cb(err, user));
  })
);


module.exports = passport;