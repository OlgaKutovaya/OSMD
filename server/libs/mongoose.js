const
  mongoose = require('mongoose'),
  config = require('../config');

mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoose.host);

module.exports = mongoose;
