const apiRouter = require('express').Router();
const checkAdmin = require('../../middleware/checkAdmin');
const passportJwtAuth = require('../../middleware/passport-jwt-auth');


apiRouter.use('/categories', require('./categories.router'));
apiRouter.use('/users', require('./users.router'));
apiRouter.use('/documents', require('./documents.router'));
apiRouter.use('/server-status', require('./server-status.router'));
apiRouter.use('/admin', passportJwtAuth, checkAdmin, require('./admin'));

module.exports = apiRouter;
