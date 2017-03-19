const passport = require('../libs/passport');

/**
 * Passport JWT auth alias
 */
module.exports = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error: {
          message: info.message || 'Unauthorized'
        }
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
