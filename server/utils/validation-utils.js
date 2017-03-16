const validator = require('validator');

exports.registerValidator = (body) => {
  let errors = [];

  const {username, email, password, passwordConf} = body;

  if (username) {
    if (!validator.isLength(username, {min: 3})) {
      errors.push('Username must be more than 2 characters');
    }
  } else {
    errors.push('Username is empty');
  }
  if (email) {
    if (!validator.isEmail(email)) {
      errors.push('Email is invalid');
    }
  } else {
    errors.push('Email is empty');
  }
  if (password) {
    if (!validator.isLength(password, {min: 6})) {
      errors.push('Password must be more than 5 characters');
    }
    if (password !== passwordConf) {
      errors.push('Passwords isn\'t match');
    }
  } else {
    errors.push('Password is empty');
  }
  return errors;
};

exports.objectIdValidator = (id) => {
  return validator.isMongoId(id);
};
