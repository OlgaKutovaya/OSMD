const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config');
const User = require('../models/user');

const passportJwtConfig = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

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

module.exports = passport;