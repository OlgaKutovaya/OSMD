const validator = require('validator');

function registerValidator(body) {
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
}

function objectIdValidator(id) {
  if (typeof id === 'string') {
    return validator.isMongoId(id);
  }
  return false;
}

function categoryValidator(body) {
  console.log(body);
  const result = {
    errors: [],
    data: {}
  };

  if (body.name && typeof body.name === 'string') {
    result.data.name = validator.escape(body.name);
  } else {
    result.errors.push('Название категории не задано');
  }
  return result;
}


function documentValidator(body) {
  const result = {
    data: {},
    errors: []
  };

  // check title field

  if (body.title && typeof body.title === 'string') {
    result.data.title = validator.escape(body.title);
  } else {
    result.errors.push('Название документа не задано');
  }

  // check description field

  if (body.description && typeof body.description === 'string') {
    result.data.description = validator.escape(body.description);
  } else {
    result.errors.push('Описание документа не задано');
  }

  // check category field

  if (objectIdValidator(body.category)) {
    result.data.category = body.category;
  } else {
    result.errors.push('Неверный формат ID категории');
  }

  // check subcategory field

  if (body.subcategory === 'null') {
    result.data.subcategory = undefined;
  } else if (objectIdValidator(body.subcategory)) {
    result.data.subcategory = body.subcategory;
  } else {
    result.errors.push('Неверный формат ID подкатегории');
  }

  // check tags field

  if (body.tags && Array.isArray(body.tags)) {
    result.data.tags = [];
    for (const tag of body.tags) {
      if (typeof tag === 'string') {
        result.data.tags.push(validator.escape(tag));
      }
    }
  } else if (body.tags === undefined) {
    result.data.tags = [];
  } else {
    result.errors.push('Неверный формат тегов');
  }

  // check price field

  if (typeof body.price === 'string' || typeof body.price === 'number') {
    const price = parseFloat(body.price);
    if (price > 0) {
      result.data.price = price;
    }
  } else {
    result.errors.push('Неверный формат цены');
  }
  console.log(result);
  return result;
}


module.exports = {
  objectIdValidator,
  documentValidator,
  categoryValidator,
  registerValidator
};
