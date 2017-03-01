const mongoose = require('../libs/mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      require: true,
      unique: true
    },
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
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


const User = mongoose.model('User', userSchema);

module.exports = User;