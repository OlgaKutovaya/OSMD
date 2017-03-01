const apiRouter = require('express').Router();

apiRouter.use('/users', require('./users.router'));
apiRouter.use('/documents', require('./documents.router'));
apiRouter.use('/server-status', require('./server-status.router'));

module.exports = apiRouter;