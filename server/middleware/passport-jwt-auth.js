const passport = require('../libs/passport');

/**
 * Passport JWT auth alias
 */
module.exports = passport.authenticate('jwt', {session: false});