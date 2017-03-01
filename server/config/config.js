const merge = require('extend');
const configProduction = require('./config.production');

const config = {
  server: {
    port: 3000,
    apiRoute: '/api/v1'
  },
  mongoose: {
    host: 'mongodb://localhost/osmd'
  },
  passport: {},
  jwt: {
    secret: 'H1teNDQcxrkxKl4vmql',
    options: {
      expiresIn: 7 * 24 * 60 * 60 * 1000
    }
  },
  session: {
    secret: 'B1zKxEwmqxryQKlVv79l',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    }
  },
  mailer: {}
};

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(true, config, configProduction);
} else {
  module.exports = config;
}


