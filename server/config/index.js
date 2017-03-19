const
  _ = require('lodash'),
  configCommon = require('./config.common'),
  configProduction = require('./config.production');


if (process.env.NODE_ENV === 'production') {
  module.exports = _.merge(configCommon, configProduction);
}
else {
  module.exports = configCommon;
}
