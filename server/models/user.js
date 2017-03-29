/**
 * Module dependencies
 */

const
  mongoose = require('../libs/mongoose'),
  bcrypt = require('bcrypt'),
  validator = require('validator'),
  Promise = require('bluebird'),
  findOrCreate = require('mongoose-findorcreate');

/**
 * Mongoose User Schema
 */
const userSchema = new mongoose.Schema(
  {
    local: {
      email: {
        type: String,
        validate: {
          validator: (val) => {
            return validator.isEmail(val);
          },
          message: '{VALUE} is not a valid email'
        }
      },
      password: {
        type: String,
        select: false
      },
      username: {
        type: String
      },
      confirmed: {
        type: Boolean,
        default: false
      }
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    twitter: {
      id: String,
      token: String,
      displayName: String,
      name: String
    },
    role: {
      type: [String],
      default: ['user'],
      select: false
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
 * @param user:Object
 * @returns {Promise|Promise.<user>|*}
 */
userSchema.statics.createLocalUser = (user) => {
  return bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    const newUser = {
      local: {
        email: user.email,
        password: user.password,
        username: user.username
      }
    };
    console.log(newUser);
    return User.create(newUser);
  });
};


userSchema.statics.pagination = (skip, limit) => {
  const userData = User.find()
    .select('+role')
    .skip(skip)
    .limit(limit)
    .lean();
  const count = User.count();

  return Promise.all([userData, count]);
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

userSchema.statics.deleteById = (userId) => {
  return User.findByIdAndRemove(userId);
};


/**
 * Init User model
 */

const User = mongoose.model('User', userSchema);

module.exports = User;
