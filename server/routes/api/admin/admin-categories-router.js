const router = require('express').Router();
const Category = require('../../../models/category');
const checkMongoId = require('../../../middleware/check-mongoId');
const {categoryValidator, objectIdValidator} = require('../../../utils/validation-utils');

router.get('/', (req, res, next) => {
  Category.findCategoriesForAdmin()
    .then(categories => {
      return res.json(categories);
    }).catch(err => next(err));
});

router.post('/', (req, res, next) => {
  /*const validationResult = categoryValidator(req.body);
   if (validationResult.errors.length > 0) {
   return res.status(400).json(validationResult.errors);
   }*/
  // TODO: validation
  Category.createCategory(req.body)
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
      return res.status(404).json({
        message: 'Категория не найдена'
      });
    }).catch(err => next(err));
});


router.put('/:id', checkMongoId, (req, res, next) => {
  const newCategory = req.body;
  Category.updateCategoryById(req.params.id, newCategory)
    .then(category => {
      if (!category) {
        return res.status(404).json({
          message: 'Категория не найдена'
        });
      }
      return res.json(category);
    }).catch(err => next(err));

});

router.delete('/:id', checkMongoId, (req, res, next) => {
  Category.deleteCategoryById(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: 'Категория не найдена.'
        });
      }
      return res.json(result);
    }).catch(err => next(err));
});

module.exports = router;
