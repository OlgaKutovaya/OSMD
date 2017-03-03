const
  router = require('express').Router(),
  serverTime = require('../../utils/server-time');


router.get('/', (req, res) => {
  res.json({
    started: serverTime.startTime,
    uptime: serverTime.uptime,
    currentTime: new Date()
  });
});

module.exports = router;