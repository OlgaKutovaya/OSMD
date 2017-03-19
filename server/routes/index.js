const
  router = require('express').Router(),
  path = require('path'),
  config = require('../config');

router.get('/', function (req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.resolve(__dirname, '../../client/osmd-web/dist/index.html'));
  } else {
    res.redirect(config.server.clientUrl); // need started angular-cli webpack-dev-server
  }

});

module.exports = router;
