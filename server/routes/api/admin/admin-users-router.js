const router = require('express').Router();
const User = require('../../../models/user');

router.get('/', (req, res, next) => {
  const {skip = 0, limit = 10} = req.query;
  User.findUsersForAdmin(+skip, +limit)
    .spread((users, count) => {
      res.json({
        users: users,
        count: count
      });
    }).catch(err => next(err));

});

module.exports = router;
