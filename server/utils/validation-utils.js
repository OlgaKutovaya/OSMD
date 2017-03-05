const validator = require('validator');

exports.registerValidator = (body) => {
  let errors = [];

  const {username, email, password} = body;

  if (username) {
    if (!validator.isLength(username, {min: 3})) {
      errors.push({
        username: 'Username must be more than 2 characters'
      });
    }
  } else {
    errors.push({
      username: 'Username must be filled'
    });
  }
  if (email) {
    if (!validator.isEmail(email)) {
      errors.push({
        email: 'Email is invalid'
      });
    }
  } else {
    errors.push({
      email: 'Email must be filled'
    });
  }
  if (password) {
    if (!validator.isLength(password, {min: 6})) {
      errors.push({
        password: 'Password must be more than 5 characters'
      });
    }
  } else {
    errors.push({
      password: 'Password must be filled'
    });
  }
  return errors;
};

exports.objectIdValidator = (id) => {
  return validator.isMongoId(id);
};
