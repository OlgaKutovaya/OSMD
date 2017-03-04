const
  mongoose = require('mongoose'),
  config = require('../config/config');

// mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoose.local.host);

module.exports = mongoose;