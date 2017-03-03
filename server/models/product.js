const mongoose = require('../libs/mongoose');

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
      min: [0, 'Price must be posititve value']
    }
  },
  {timestamps: true}
);

productSchema.statics.createProduct = (newProduct) => {
  return Product.create(newProduct);
};

productSchema.statics.removeProductById = (id) => {
  return Product.findByIdAndRemove(id);
};

productSchema.statics.updateProductById = (id, newProduct) => {
  return Product.findByIdAndUpdate(id, newProduct, {new: true});
};

productSchema.statics.findProductById = (id) => {
  return Product.findById(id);
};


const Product = mongoose.model('Product', productSchema);

module.exports = Product;