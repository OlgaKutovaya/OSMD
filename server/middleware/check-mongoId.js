const validator = require('validator');

module.exports = (req, res, next) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid ID'
      }
    });
  }
  next();
};