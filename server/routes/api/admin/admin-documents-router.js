const router = require('express').Router();
const Document = require('../../../models/document');

router.get('/', (req, res, next) => {
  Document.findDocumentsForAdmin()
    .then(categories => {
      res.json(categories);
    }).catch(err => next(err));
});

module.exports = router;
