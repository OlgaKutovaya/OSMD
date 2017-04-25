const
  router = require('express').Router(),
  Category = require('../../../models/category'),
  checkMongoId = require('../../../middleware/check-mongoId'),
  {HttpError} = require('../../../utils/errors');

router.get('/', (req, res, next) => {
  Category.findCategoriesForAdmin()
    .then(categories => {
      return res.json(categories);
    }).catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Category.addCategory(req.body)
    .then(category => {
      return res.json(category);
    }).catch(err => next(err));

});

router.get('/:id', checkMongoId, (req, res, next) => {
  Category.findCategoryByIdForAdmin(req.params.id)
    .then(category => {
      if (category && category.length) {
        return res.json(category[0]);
      }
      return next(new HttpError(404, 'Категория не найдена'));
    }).catch(err => next(err));
});


router.put('/:id', checkMongoId, (req, res, next) => {
  const updatedCategory = req.body;
  Category.updateCategoryById(req.params.id, updatedCategory)
    .then(category => {
      if (!category) {
        return next(new HttpError(404, 'Категория не найдена'));
      }
      return res.json(category);
    }).catch(err => next(err));

});

router.delete('/:id', checkMongoId, (req, res, next) => {
  Category.deleteCategoryById(req.params.id)
    .then(result => {
      if (!result) {
        return next(new HttpError(404, 'Категория не найдена'));
      }
      return res.json(result);
    }).catch(err => next(err));
});

module.exports = router;
