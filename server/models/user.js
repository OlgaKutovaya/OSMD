const mongoose = require('../libs/mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val) => {
          return validator.isEmail(val);
        },
        message: '{VALUE} is not a valid email'
      }
    },
    username: {
      type: String,
      required: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    role: {
      type: [String],
      default: ['user'],
      select: false
    }
  },
  {timestamps: true}
);

userSchema.statics.createUser = (newUser) => {
  return bcrypt.hash(newUser.password, 10).then(hash => {
    newUser.password = hash;
    return newUser.save();
  });
};

userSchema.statics.checkPassword = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash);
};

userSchema.statics.findUserById = (id) => {
  return User.findById(id);
};
userSchema.statics.findUserByEmail = (email) => {
  return User.findOne({email});
};

/*userSchema.statics.confirmEmail = (userId) => {
  const newConfirm = new Confirm({userId});
  console.log(newConfirm);
};*/


const User = mongoose.model('User', userSchema);

module.exports = User;