const mongoose = require('../libs/mongoose');

/**
 * Purchase Schema
 */

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Document'
    },
    price: {
      type: Number,
      default: 0
    },
    purchasedAt: {
      type: Date,
      default: new Date() // TODO: fix date setter
    }
  }
);

/**
 * Shema static methods
 */
/**
 *
 * @param user:User
 * @param document:Document
 */
purchaseSchema.statics.createPurchase = (user, document) => {
  return Purchase.create({
    user: user._id,
    documentId: document._id,
    price: document.price
  });
};

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
