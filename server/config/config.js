const _ = require('lodash');
const configProduction = require('./config.production');

const config = {
  server: {
    host: 'http://127.0.0.1',
    port: process.env.PORT || 3000,
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
  mailer: {
    gmail: {
      service: 'Gmail',
      auth: {
        user: '*',
        pass: '*'
      }
    },
    yandex: {
      service: 'Yandex',
      auth: {
        user: '**',
        pass: '*'
      }
    },
    mailOptions: {
      from: 'osmd <vetalpro.exe@yandex.ua>',
      to: 'vetalpro.exe@gmail.com',
      subject: 'test',
      text: 'plain text',
      html: '<b>html text</b>'
    }
  },
  helmet: {
    hidePoweredBy: true
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = _.merge(config, configProduction);
} else {
  module.exports = config;
}


