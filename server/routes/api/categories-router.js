const router = require('express').Router();
const Category = require('../../models/category')
const checkMongoId = require('../../middleware/check-mongoId');

router.get('/', (req, res, next) => {
  Category.findCategories()
    .then(categories => {
      res.json(categories);
    }).catch(err => next(err));
});
router.get('/tree', (req, res, next) => {
  Category.getCategoriesTree()
    .then(categories => {
      res.json(categories);
    }).catch(err => next(err));
});

router.get('/:id', checkMongoId, (req, res, next) => {
  Category.findCategoryById(req.params.id)
    .then(categories => {
      res.json(categories);
    }).catch(err => next(err));
});

module.exports = router;
