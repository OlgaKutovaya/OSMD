const router = require('express').Router();
const Document = require('../../models/document');
const resMsg = require('../../utils/res-msg');

router.get('/', (req, res, next) => {
  Document.find()
    .then(
      (docs) => res.json({
        success: true,
        documents: docs
      }))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Document.createDocument(req.body)
    .then(
      (doc) => res.json({
        success: true,
        doc
      }))
    .catch(err => next(err));

});
router.delete('/:id', (req, res, next) => {
  Document.removeDocument(req.params.id)
    .then(
      (doc) => {
        if (!doc) {
          return resMsg.notFound(res);
        }
        res.json({
          success: true,
          document: doc
        })
      })
    .catch(err => next(err));
});
router.put('/:id', (req, res, next) => {
  Document.updateDocument(req.params.id, req.body)
    .then(
      (doc) => {
        if (!doc) {
          return resMsg.notFound(res);
        }
        res.json({
          success: true,
          document: doc
        })
      })
    .catch(err => next(err));
});


module.exports = router;