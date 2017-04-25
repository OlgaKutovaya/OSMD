const router = require('express').Router(),
  Document = require('../../models/document'),
  resMsg = require('../../utils/res-msg'),
  checkMongoId = require('../../middleware/check-mongoId'),
  checkAdmin = require('../../middleware/checkAdmin'),
  passportJwtAuth = require('../../middleware/passport-jwt-auth'),
  multer = require('multer'),
  saveFile = require('../../utils/save-file'),
  {documentValidator} = require('../../utils/validation-utils'),
  mongoose = require('../../libs/mongoose'),
  Purchase = require('../../models/purchase');


const multerSettings = {
  fileFilter: function fileFilter(req, file, next) {
    /*if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
     return next(new FileError(400, 'Неверный формат файла.'));
     }*/
    next(null, true);
  },
  uploadLimits: {
    fileSize: 2000000
  },
  storage: multer.memoryStorage()
};

const upload = multer({
  storage: multerSettings.storage,
  limits: multerSettings.uploadLimits,
  fileFilter: multerSettings.fileFilter
});


/**
 * GET all documents
 */
router.route('/')
  .get((req, res, next) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    Document.getAllDocuments(skip, limit)
      .then(documents => {
          res.json(documents);
        }
      )
      .catch(err => next(err));
  })

  /**
   *POST document (only auth admin users)
   */

  .post(passportJwtAuth, checkAdmin, upload.single('file'), (req, res, next) => {
    let fileData;
    const validationResult = documentValidator(req.body);
    if (validationResult.errors.length) {
      return res.status(400).json(validationResult.errors);
    }
    if (req.file) {
      fileData = {
        path: '',
        buffer: req.file.buffer,
        filename: req.file.originalname,
        size: req.file.size
      };
    }
    validationResult.data._id = new mongoose.Types.ObjectId();

    saveFile(fileData, validationResult.data)
      .then(data => {
        return Document.createDocument(data);
      }).then(document => {
      res.json(document);
    }).catch(err => next(err));
  });

/**
 *GET product by ID (all users)
 */

router.route('/:id')
  .get(checkMongoId, (req, res, next) => {
    const id = req.params.id;
    Document.findDocumentById(id)
      .then(product => {
        if (!product) {
          return resMsg.notFound(res, 'Product not found');
        }
        return res.json({
          success: true,
          product: product
        });
      }).catch(err => next(err));
  })

  /**
   * DELETE product by ID (only auth admin users)
   */

  .delete(passportJwtAuth, checkAdmin, checkMongoId, (req, res, next) => {
    Document.removeDocumentById(req.params.id)
      .then(product => {
        if (!product) {
          return resMsg.notFound(res, 'Product not found');
        }
        res.json({
          success: true,
          product: product
        });
      })
      .catch(err => next(err));
  })

  /**
   * PUT (UPDATE) product by ID (only auth admin users)
   */

  .put(passportJwtAuth, checkAdmin, checkMongoId, (req, res, next) => {
    Document.updateDocumentById(req.params.id, req.body)
      .then(product => {
        if (!product) {
          return resMsg.notFound(res, 'Product not found');
        }
        res.json({
          success: true,
          product: product
        });
      })
      .catch(err => next(err));
  });

/**
 * Buy product (auth users)
 */

router.post('/buy/:id', passportJwtAuth, checkMongoId, (req, res, next) => {
  const documentId = req.params.id;
  Document.findDocumentById(documentId)
    .then(document => {
      if (!document) {
        return resMsg.notFound(res, 'Product not found');
      }
      return Purchase.createPurchase(req.user, document);
    })
    .then(purchase => purchase.populate('documentId').execPopulate())
    .then(purchase => {
      res.json(purchase);
    })
    .catch(err => next(err));
});

module.exports = router;
