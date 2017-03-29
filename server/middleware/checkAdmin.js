/**
 * Check Admin middleware (from req.user)
 * Passport itself set req.user after auth strategy
 * This middleware must be setted after passport auth strategy
 */
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
  if (req.user && req.user.role) {
    if (req.user.role.indexOf('admin') > -1) {
      return next();
    }
  }
  return res.status(403).json({
    message: 'You are not admin'
  });
};
