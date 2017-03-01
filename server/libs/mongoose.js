const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.mongoose.host);
mongoose.Promise = require('bluebird');

module.exports = mongoose;