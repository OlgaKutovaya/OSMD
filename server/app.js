const
  express = require('express'),
  path = require('path'),
  // favicon = require('serve-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  session = require('express-session'),
  passport = require('./libs/passport'),
  flash = require('connect-flash'),
  _ = require('lodash'),
  helmet = require('helmet'),
  cors = require('cors'),
  mongoose = require('./libs/mongoose'),
  MongoStore = require('connect-mongo')(session),
  {HttpError, MongooseError} = require('./utils/errors'),
  port = config.server.port;

/**
 * Routes dependecies
 */
const index = require('./routes/index');
const apiRoutes = require('./routes/api');

/**
 * Express App
 */
const app = express();

/**
 * View engine settings
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Helmet config
 */
app.use(helmet(config.helmet));


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * Session config
 */
app.use(session(_.merge(true, config.session,
  {store: new MongoStore({mongooseConnection: mongoose.connection})}
)));

/**
 * Passport init
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Morgan init
 */
app.use(logger('dev'));

/**
 * Bodyparser init
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Flash session init
 */
app.use(flash());

/**
 * Static routes
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/osmd-web/dist')));
app.use('/apidoc', express.static(path.resolve(__dirname, '../apidoc')));

/**
 * Routes init
 */
app.use(config.server.apiRoute, cors(config.cors), apiRoutes);
app.use('/*', index);

/**
 * Error handlers
 */

/**
 * catch 404 and forward to error handler
 */

app.use((req, res, next) => {
  next(new HttpError(404));
});

/**
 * Common  error handler
 */
app.use((err, req, res, next) => {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof MongooseError && err.name === 'ValidationError') {
    err.status = 400;
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    err.status = 500;
  }

  res.status(err.status || 500);
  if (err.status !== 404) {
    console.error(err);
  }
  if (/^\/api\/v\d\/(?!users\/confirm)/.test(req.url)) {
    res.json({
      message: err.message,
      status: err.status
    });
  } else {
    res.render('error');
  }
});

if (module.parent) {
  module.exports = app;
} else {
  app.listen(port, () => {
    console.log(`Server started on 127.0.0.1:${port}`);
  });
}
