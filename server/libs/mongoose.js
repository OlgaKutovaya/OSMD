const mongoose = require('mongoose');
const config = require('../config/config');

// mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoose.mongolab.host);

module.exports = mongoose;