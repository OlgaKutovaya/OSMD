const router = require('express').Router();
const Product = require('../../models/product');
const resMsg = require('../../utils/res-msg');
const checkMongoId = require('../../middleware/check-mongoId');
const checkAdmin = require('../../middleware/checkAdmin');
const passportJwtAuth = require('../../middleware/passport-jwt-auth');
const Purchase = require('../../models/purchase');
const _ = require('lodash');


router.route('/')
  .get((req, res, next) => {
    Product.find()
      .lean()
      .then(products =>
        res.json({
          success: true,
          products: products
        }))
      .catch(err => next(err));
  })

  .post(passportJwtAuth, checkAdmin, (req, res, next) => {
    Product.createProduct(req.body)
      .then(product =>
        res.json({
          success: true,
          product: product
        }))
      .catch(err => next(err));
  });

router.route('/:id')
  .get(checkMongoId, (req, res, next) => {
    const id = req.params.id;
    Product.findProductById(id)
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
  .delete(passportJwtAuth, checkAdmin, checkMongoId, (req, res, next) => {
    Product.removeProductById(req.params.id)
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
  .put(passportJwtAuth, checkAdmin, checkMongoId, (req, res, next) => {
    Product.updateProductById(req.params.id, req.body)
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

router.post('/buy/:id', passportJwtAuth, checkMongoId, (req, res, next) => {
  const productId = req.params.id;
  Product.findProductById(productId)
    .then(product => {
      if (!product) {
        return resMsg.notFound(res, 'Product not found');
      }
      return Purchase.createPurchase(req.user, product);
    })
    .then(purchase => purchase.populate('productId').execPopulate())
    .then(purchase => {
      res.json({
        message: 'You have purchased a product',
        purchase: purchase
      });
    })
    .catch(err => next(err));
});

module.exports = router;