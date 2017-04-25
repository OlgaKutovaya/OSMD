const
  mongoose = require('../libs/mongoose'),
  Promise = require('bluebird');

const documentSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5
    },
    label: {
      type: String
    },
    description: {
      type: String
    },
    filename: {
      type: String
    },
    price: {
      type: Number,
      default: 0,
      min: [0, 'Цена должна быть положительной.']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    tags: {
      type: [String],
      default: []
    }

  },
  {timestamps: true}
);

/**
 * Schema static methods
 */


documentSchema.statics.getAllDocuments = function (skip, limit) {
  const documentsPromise = this.aggregate()
    .lookup({from: 'categories', localField: 'category', foreignField: '_id', as: 'category'})
    .unwind({
      path: '$category',
      preserveNullAndEmptyArrays: true
    })
    .lookup({from: 'subcategories', localField: 'subcategory', foreignField: '_id', as: 'subcategory'})
    .unwind({
      path: '$subcategory',
      preserveNullAndEmptyArrays: true
    })
    .project({
      'title': 1,
      'category._id': 1,
      'category.name': 1,
      'subcategory._id': 1,
      'subcategory.name': 1
    });
  if (!isNaN(skip) && !isNaN(limit)) {
    console.log(111);
    return documentsPromise
      .skip(skip)
      .limit(limit);
  }

  return documentsPromise;
};

documentSchema.statics.findDocumentsForAdmin = function (skip, limit) {
  const documentsPromise = this.aggregate([
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ]);
  const countPromise = this.count();
  return Promise.all([documentsPromise, countPromise]);
};

documentSchema.statics.getDocumentsByCategoryId = function (categoryId) {
  return this.aggregate()
    .match({categoryId: categoryId})
    .project({
      'label': '$title'
    });
};


documentSchema.statics.createDocument = function (newDocument) {
  return this.create(newDocument);
};


documentSchema.statics.removeDocumentById = function (id) {
  return this.findByIdAndRemove(id);
};


documentSchema.statics.updateDocumentById = function (id, newProduct) {
  return this.findByIdAndUpdate(id, newProduct, {new: true});
};


documentSchema.statics.findDocumentById = function (id) {
  return this.findById(id);
};


const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
