const router = require('express').Router();
const Document = require('../../models/document');
const resMsg = require('../../utils/res-msg');
const checkMongoId = require('../../middleware/check-mongoId');

router.route('/')
  .get((req, res, next) => {
    Document.find()
      .then(
        (docs) => res.json({
          success: true,
          documents: docs
        }))
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    Document.createDocument(req.body)
      .then(
        (doc) => res.json({
          success: true,
          document: doc
        }))
      .catch(err => next(err));
  });

router.route('/:id')
  .get(checkMongoId, (req, res, next) => {
    const id = req.params.id;
    Document.findDocumentById(id)
      .then((doc) => {
        if (!doc) {
          return resMsg.notFound(res, 'Document not found');
        }
        return res.json({
          success: true,
          document: doc
        });
      }).catch(err => next(err));
  })
  .delete(checkMongoId, (req, res, next) => {
    Document.removeDocumentById(req.params.id)
      .then(
        (doc) => {
          if (!doc) {
            return resMsg.notFound(res, 'Document not found');
          }
          res.json({
            success: true,
            document: doc
          });
        })
      .catch(err => next(err));
  })
  .put(checkMongoId, (req, res, next) => {
    Document.updateDocumentById(req.params.id, req.body)
      .then(
        (doc) => {
          if (!doc) {
            return resMsg.notFound(res, 'Document not found');
          }
          res.json({
            success: true,
            document: doc
          });
        })
      .catch(err => next(err));
  });


module.exports = router;