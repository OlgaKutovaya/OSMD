const
  _ = require('lodash'),
  configProduction = require('./config.production');

const config = {
  server: {
    host: 'http://127.0.0.1',
    port: process.env.PORT || 3000,
    apiRoute: '/api/v1'
  },
  mongoose: {
    local: {
      host: 'mongodb://localhost/osmd'
    },
    mongolab: {
      host: 'mongodb://osmdadmin:123456@ds113650.mlab.com:13650/osmd'
    }
  },
  passport: {
    googleAuthOptions: {
      clientID: '441428006509-34qjiv949e9f9h5bmbueuleqchjvto6m.apps.googleusercontent.com',
      clientSecret: 'zgyIIPOkxtrgUGObwkt94Bc_',
      callbackURL: 'http://127.0.0.1:3000/api/v1/users/login/google/callback'
    },
    facebookAuthOptions: {
      clientID: '393451751013103',
      clientSecret: 'cd441f83eb3c78a7cc2068ca3e6429ef',
      callbackURL: 'http://localhost:3000/api/v1/users/login/facebook/callback'
    },
    twitterAuthOptions: {}
  },
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


