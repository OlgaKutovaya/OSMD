const
  jwtSecret = process.env.JWT_SECRET,
  sessionSecret = process.env.SESSION_SECRET,
  yandexUser = process.env.YANDEX_USER,
  yandexPassword = process.env.YANDEX_PASSWORD;

const config = {
  production: false,
  server: {
    host: 'http://127.0.0.1',
    port: process.env.PORT || 3000,
    apiRoute: '/api/v1',
  },
  mongoose: {
    host: !process.env.MONGOLAB ? 'mongodb://localhost/osmd' : 'mongodb://osmdadmin:123456@ds113650.mlab.com:13650/osmd'
  },
  jwt: {
    secret: jwtSecret || 'H1teNDQcxrkxKl4vmql',
    options: {
      expiresIn: 7 * 24 * 60 * 60 * 1000
    }
  },
  session: {
    secret: sessionSecret || 'B1zKxEwmqxryQKlVv79l',
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
        user: null || yandexUser,
        pass: null || yandexPassword
      }
    },
    mailOptions: {
      from: 'OSMD <vetalpro.exe@yandex.ua>',
      to: 'vetalpro.exe@gmail.com',
      subject: 'Email Verification',
      text: 'Email Activate link',
      html: '<b>Email Activate link</b>'
    }
  },
  helmet: {
    hidePoweredBy: true
  }
};
config.server.callbackUrl = `${config.server.host}:${config.server.port}`;
config.server.clientUrl = `${config.server.host}:4200`;

config.passport = {
  googleAuthOptions: {
    clientID: '441428006509-34qjiv949e9f9h5bmbueuleqchjvto6m.apps.googleusercontent.com',
    clientSecret: 'zgyIIPOkxtrgUGObwkt94Bc_',
    callbackURL: `${config.server.host}:${config.server.port + config.server.apiRoute}/users/login/google/callback`
  },
  facebookAuthOptions: {
    clientID: '393451751013103',
    clientSecret: 'cd441f83eb3c78a7cc2068ca3e6429ef',
    callbackURL: `${config.server.host}:${config.server.port + config.server.apiRoute}/users/login/facebook/callback`
  },
  twitterAuthOptions: {}
};

module.exports = config;
