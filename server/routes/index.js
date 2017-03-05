const router = require('express').Router();

router.get('/', function (req, res, next) {
  res.render('index', {title: 'OSMD'});
});

module.exports = router;