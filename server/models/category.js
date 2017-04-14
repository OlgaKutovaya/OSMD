const mongoose = require('../libs/mongoose');

const categorySchema = new mongoose.Schema({
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
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {timestamps: true}
);

// ============ PUBLIC METHODS===============

categorySchema.statics.findCategories = function () {
  return this.find()
    .sort({order: 1, parent: 1})
    .select('label name order parent');
};


categorySchema.statics.getCategoriesTree = function () {
  return this.aggregate()
    .match({parent: null, visible: true})
    .lookup({from: 'categories', localField: '_id', foreignField: 'parent', as: 'children'})
    .project({
      'label': 1,
      'name': 1,
      'children._id': 1,
      'children.label': 1,
      'children.name': 1
    });
};

categorySchema.statics.findCategoryById = function (id) {

  return this.aggregate()
    .match({_id: new mongoose.Types.ObjectId(id)})
    .lookup({from: 'documents', localField: '_id', foreignField: 'category', as: 'documents'})
    .project({
      'label': 1,
      'name': 1,
      'description': 1,
      'picture': 1,
      'documents': {
        $filter: {
          input: '$documents',
          as: 'document',
          cond: {
            '$eq': ['$$document.visible', true]
          }
        }
      }
    });
};
// ============ PUBLIC METHODS END===============


// ============ ADMIN METHODS===============

categorySchema.statics.findCategoriesForAdmin = function () {
  return this.find({parent: null});
};

categorySchema.statics.findCategoryByIdForAdmin = function (id) {
  return this.aggregate()
    .match({_id: new mongoose.Types.ObjectId(id)})
    .lookup({from: 'categories', localField: '_id', foreignField: 'parent', as: 'children'})
    .lookup({from: 'documents', localField: '_id', foreignField: 'category', as: 'documents'});
};

categorySchema.statics.createCategory = function (newCategory) {
  return this.create(newCategory);
};

categorySchema.statics.removeCategoryById = function (id) {
  return this.findByIdAndRemove(id);
};

categorySchema.statics.updateCategoryById = function (id, newCategory) {
  return this.findByIdAndUpdate(id, newCategory, {new: true});
};

// ============ ADMIN METHODS END===============


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
