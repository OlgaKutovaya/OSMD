const validator = require('validator');

/**
 * Check mongoID middleware (query param)
 */

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
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