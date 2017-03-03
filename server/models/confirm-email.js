const mongoose = require('../libs/mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const confirmSchema = mongoose.Schema({
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
      type: String,
      default: new mongoose.Types.ObjectId()
    },
    createdAt: {
      type: Date,
      expires: '1h'
    }
  },
  {timestamps: true}
);


const Confirm = mongoose.model('Confirm', confirmSchema);

module.exports = Confirm;