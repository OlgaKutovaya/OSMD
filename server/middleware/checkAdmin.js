module.exports = (req, res, next) => {
  if (req.user && req.user.role) {
    if (req.user.role.indexOf('admin') > -1) {
      return next();
    }
  }
  return res.status(403).json({
    error: {
      message: 'You are not admin'
    }
  });
};