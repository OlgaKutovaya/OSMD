const config = {
  production: true,
  server: {
    host: 'http://185.51.247.32',
    apiRoute: '/api/v1',
  },
  mailer: {}
};

config.server.callbackUrl = `${config.server.host}`;
config.server.clientUrl = `${config.server.host}`;

config.passport = {
  googleAuthOptions: {
    callbackURL: `${config.server.host + config.server.apiRoute}/users/login/google/callback`
  },
  facebookAuthOptions: {
    callbackURL: `${config.server.host + config.server.apiRoute}/users/login/facebook/callback`
  },
  twitterAuthOptions: {}
};

module.exports = config;
