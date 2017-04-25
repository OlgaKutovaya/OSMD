const router = require('express').Router();
const Document = require('../../../models/document');

router.get('/', (req, res, next) => {
  const {skip = 0, limit = 10} = req.query;
  Document.findDocumentsForAdmin(parseInt(skip), parseInt(limit))
    .spread((documents, count) => {
      res.json({
        documents,
        count
      });
    })
    .catch(err => next(err));
});

module.exports = router;
