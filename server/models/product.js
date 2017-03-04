const mongoose = require('../libs/mongoose');

/**
 * Product Schema
 */
const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5
    },
    description: {
      type: String
    },
    downloadLink: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0,
      min: [0, 'Price must be positive value']
    }
  },
  {timestamps: true}
);

/**
 * Schema static methods
 */
/**
 *
 * @param newProduct:Object
 * @returns newProduct
 */
productSchema.statics.createProduct = (newProduct) => {
  return Product.create(newProduct);
};
/**
 *
 * @param id
 * @returns {Query}
 */
productSchema.statics.removeProductById = (id) => {
  return Product.findByIdAndRemove(id);
};
/**
 *
 * @param id
 * @param newProduct
 * @returns {Query}
 */
productSchema.statics.updateProductById = (id, newProduct) => {
  return Product.findByIdAndUpdate(id, newProduct, {new: true});
};
/**
 *
 * @param id
 * @returns {Query}
 */
productSchema.statics.findProductById = (id) => {
  return Product.findById(id);
};

/**
 * Init Product model
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;