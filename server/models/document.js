const mongoose = require('../libs/mongoose');

const documentSchema = mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    price: {
      type: Number,
      default: 0
    }
  },
  {timestamps: true}
);

documentSchema.statics.createDocument = (newDocument) => {
  return new Document(newDocument).save();
};

documentSchema.statics.removeDocument = (id) => {
  return Document.findByIdAndRemove(id).lean();
};

documentSchema.statics.updateDocument = (id, newDocument) => {
  return Document.findByIdAndUpdate(id, newDocument, {new: true}).lean();
};

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;