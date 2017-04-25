const mongoose = require('../libs/mongoose');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true,
      unique: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {timestamps: true}
);

// ============ PUBLIC METHODS===============

categorySchema.statics.findCategoriesWithSubs = function () {
  return this.aggregate([
    {
      $lookup: {
        from: 'subcategories',
        localField: '_id',
        foreignField: 'category',
        as: 'subcategories'
      }
    },
    {
      $sort: {
        'order': 1,
        'name': 1,
      }
    }
  ]);
};

categorySchema.statics.findCategoryByQuery = function (query) {
  return this.findOne(query);
};

// ============ PUBLIC METHODS END===============


// ============ ADMIN METHODS===============
categorySchema.statics.addCategory = function (newCategory) {
  return this.create(newCategory);
};

categorySchema.statics.findCategories = function () {
  return this.find()
    .sort({'order': 1, 'name': 1});
};

categorySchema.statics.updateCategoryById = function (id, updatedCategory) {
  return this.findByIdAndUpdate(id, updatedCategory, {new: true});
};

categorySchema.statics.deleteCategoryById = function (id) {
  return this.findByIdAndRemove(id);
};

// ============ ADMIN METHODS END===============


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
