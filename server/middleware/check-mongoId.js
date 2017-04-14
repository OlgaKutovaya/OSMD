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
    return res.status(404).json({
      message: 'Запись не найдена в базе данных.'
    });
  }
  next();
};
