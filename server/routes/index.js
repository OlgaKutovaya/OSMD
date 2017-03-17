const router = require('express').Router();
const path = require('path');

router.get('/', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '../../client/osmd-web/dist/index.html'));
});

module.exports = router;