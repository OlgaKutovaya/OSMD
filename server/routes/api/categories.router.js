const
  router = require('express').Router(),
  Category = require('../../models/category'),
  Subcategory = require('../../models/subcategory'),
  {HttpError} = require('../../utils/errors');

router.get('/', (req, res, next) => {
  Category.findCategoriesWithSubs()
    .then(categories => {
      res.json(categories);
    }).catch(err => next(err));
});

router.get('/:categoryLabel/:subcategoryLabel', (req, res, next) => {
  Category.findCategoryByQuery({
    label: req.params.categoryLabel
  })
    .then(category => {
      if (!category) {
        throw new HttpError(404, 'Категория не найдена');
      }
      return Subcategory.findSubcategoryByQuery({
        category: category._id,
        label: req.params.subcategoryLabel
      });
    })
    .then(subcategory => {
      if (!subcategory[0]) {
        throw new HttpError(404, 'Подкатегория не найдена');
      }
      res.json(subcategory[0]);
    })
    .catch(err => next(err));
});

module.exports = router;
