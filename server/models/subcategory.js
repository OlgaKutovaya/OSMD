const mongoose = require('../libs/mongoose');

const subcategorySchema = new mongoose.Schema({
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    picture: {
      type: String
    },
    visible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {timestamps: true}
);

// ============ PUBLIC METHODS===============

subcategorySchema.statics.findSubcategoryByQuery = function (query) {

  return this.aggregate([
    {
      $match: query
    },
    {
      $limit: 1
    },
    {
      $lookup: {
        from: 'documents',
        localField: '_id',
        foreignField: 'category',
        as: 'documents'
      }
    }
  ]);
};


// ============ PUBLIC METHODS END===============


// ============ ADMIN METHODS===============

subcategorySchema.statics.addSubcategory = function (newSubcategory) {
  return this.create(newSubcategory);
};

subcategorySchema.statics.deleteSubcategoryById = function (id) {
  return this.findByIdAndRemove(id);
};

subcategorySchema.statics.updateSubcategoryById = function (id, newSubcategory) {
  return this.findByIdAndUpdate(id, newSubcategory, {new: true});
};

// ============ ADMIN METHODS END===============


const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
