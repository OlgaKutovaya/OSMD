const router = require('express').Router();
const serverTime = require('../../utils/server-time');


router.get('/', (req, res) => {
  res.json({
    started: serverTime.startTime,
    uptime: serverTime.uptime,
    currentTime:serverTime.currentTime
  });
});

module.exports = router;