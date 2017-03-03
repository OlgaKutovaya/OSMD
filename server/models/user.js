/**
 * Module dependencies
 */

const mongoose = require('../libs/mongoose'),
  bcrypt = require('bcrypt'),
  validator = require('validator'),
  findOrCreate = require('mongoose-findorcreate');

/**
 * Mongoose User Schema
 */
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (val) => {
          return validator.isEmail(val);
        },
        message: '{VALUE} is not a valid email'
      }
    },
    username: {
      type: String
    },
    password: {
      type: String,
      select: false,
      minlength: 6
    },
    confirmed: {
      type: Boolean,
      default: false,
      select: false
    },
    role: {
      type: [String],
      default: ['user'],
      select: false
    },
    googleId: {
      type: String
    }
  },
  {timestamps: true}
);

/**
 * Plugins init
 */

userSchema.plugin(findOrCreate);

/**
 * Schema static methods
 */

/**
 *
 * @param newUser:Object
 * @returns {Promise|Promise.<user>|*}
 */
userSchema.statics.createUser = (newUser) => {
  return bcrypt.hash(newUser.password, 10).then(hash => {
    newUser.password = hash;
    return User.create(newUser);
  });
};

/**
 *
 * @param plainPassword:string
 * @param hash:string
 */
userSchema.statics.checkPassword = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash);
};
/**
 *
 * @param id:ObjectId
 * @returns {Query}
 */
userSchema.statics.findUserById = (id) => {
  return User.findById(id);
};

/**
 *
 * @param query
 * @returns {*|Query}
 */
userSchema.statics.findUserByQuery = (query) => {
  return User.findOne(query);
};


/*userSchema.statics.confirmEmail = (userId) => {
 const newConfirm = new Confirm({userId});
 console.log(newConfirm);
 };*/

/**
 * Init User model
 */

const User = mongoose.model('User', userSchema);

module.exports = User;