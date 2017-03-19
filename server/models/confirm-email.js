const
  mongoose = require('../libs/mongoose'),
  Promise = require('bluebird'),
  randomBytes = Promise.promisify(require('crypto').randomBytes);

const ObjectId = mongoose.Schema.Types.ObjectId;

const confirmSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  confirmToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 60  //seconds
  }
});

confirmSchema.statics.createConfirm = (userId) => {
  return randomBytes(50)
    .then(buff => {
      return Confirm.create({
        userId: userId,
        confirmToken: buff.toString('hex'),
        createdAt: new Date()
      });
    });
};

confirmSchema.statics.findConfirm = (userId, confirmToken) => {
  return Confirm.findOne({userId, confirmToken});
};

confirmSchema.statics.removeConfirm = (userId, confirmToken) => {
  return Confirm.remove({userId, confirmToken});
};


const Confirm = mongoose.model('Confirm', confirmSchema);

module.exports = Confirm;
