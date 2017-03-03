/**
 * Module dependencies
 */

const router = require('express').Router(),
  Product = require('../../models/product'),
  resMsg = require('../../utils/res-msg'),
  checkMongoId = require('../../middleware/check-mongoId'),
  checkAdmin = require('../../middleware/checkAdmin'),
  passportJwtAuth = require('../../middleware/passport-jwt-auth'),
  Purchase = require('../../models/purchase');

/**
 * GET all products
 */
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

  /**
   *POST product (only auth admin users)
   */

  .post(passportJwtAuth, checkAdmin, (req, res, next) => {
    Product.createProduct(req.body)
      .then(product =>
        res.json({
          success: true,
          product: product
        }))
      .catch(err => next(err));
  });

/**
 *GET product by ID (all users)
 */

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

  /**
   * DELETE product by ID (only auth admin users)
   */

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

  /**
   * PUT (UPDATE) product by ID (only auth admin users)
   */

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

/**
 * Buy product (auth users)
 */

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