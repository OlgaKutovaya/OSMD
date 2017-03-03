const apiRouter = require('express').Router();

apiRouter.use('/users', require('./users.router'));
apiRouter.use('/products', require('./product.router.js'));
apiRouter.use('/server-status', require('./server-status.router'));

module.exports = apiRouter;