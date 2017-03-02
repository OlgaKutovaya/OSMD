const mongoose = require('../libs/mongoose');

const documentSchema = mongoose.Schema({
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

documentSchema.statics.createDocument = (newDocument) => {
  return new Document(newDocument).save();
};

documentSchema.statics.removeDocumentById = (id) => {
  return Document.findByIdAndRemove(id).lean();
};

documentSchema.statics.updateDocumentById = (id, newDocument) => {
  return Document.findByIdAndUpdate(id, newDocument, {new: true}).lean();
};

documentSchema.statics.findDocumentById = (id) => {
  return Document.findById(id);
};


const Document = mongoose.model('Document', documentSchema);

module.exports = Document;