const
  router = require('express').Router(),
  Subcategory = require('../../../models/subcategory'),
  checkMongoId = require('../../../middleware/check-mongoId'),
  {HttpError} = require('../../../utils/errors');


router.post('/', (req, res, next) => {
  Subcategory.addSubcategory(req.body)
    .then(subcategory => {
      return res.json(subcategory);
    }).catch(err => next(err));
});


router.put('/:id', checkMongoId, (req, res, next) => {
  const updatedSubcategory = req.body;
  Subcategory.updateSubcategoryById(req.params.id, updatedSubcategory)
    .then(subcategory => {
      if (!subcategory) {
        return next(new HttpError(404, 'Подкатегория не найдена'));
      }
      return res.json(subcategory);
    }).catch(err => next(err));

});

router.delete('/:id', checkMongoId, (req, res, next) => {
  Subcategory.deleteSubcategoryById(req.params.id)
    .then(subcategory => {
      if (!subcategory) {
        return next(new HttpError(404, 'Категория не найдена'));
      }
      return res.json(subcategory);
    }).catch(err => next(err));
});

module.exports = router;
