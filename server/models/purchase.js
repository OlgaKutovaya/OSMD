/**
 * Module dependencies
 */

const mongoose = require('../libs/mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Purchase Schema
 */

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User'
    },
    productId: {
      type: ObjectId,
      required: true,
      ref: 'Product'
    },
    price: {
      type: Number,
      default: 0
    },
    purchasedAt: {
      type: Date,
      default: new Date()
    }
  }
);

/**
 * Shema static methods
 */
/**
 *
 * @param user:User
 * @param product:Product
 */
purchaseSchema.statics.createPurchase = (user, product) => {
  return Purchase.create({
    userId: user._id,
    productId: product._id,
    price: product.price
  });
};

/**
 * Init Purchase model
 */

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
