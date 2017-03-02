const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config');
const session = require('express-session');
const passport = require('./libs/passport');
const flash = require('connect-flash');
const _ = require('lodash');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('./libs/mongoose');
const MongoStore = require('connect-mongo')(session);
const errors = require('./utils/errors');
const port = config.server.port;

/*routes*/
const index = require('./routes/index');
const apiRoutes = require('./routes/api');

/*base app*/
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet(config.helmet));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session(_.merge(true, config.session,
  {store: new MongoStore({mongooseConnection: mongoose.connection})}
)));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use(config.server.apiRoute, cors(), apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const HttpError = errors.HttpError;
  next(new HttpError(404));
});

// error handler
app.use((err, req, res, next) => {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof errors.MongooseError && err.name === 'ValidationError') {
    err.status = 400;
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    err.status = 500;
  }

  res.status(err.status || 500);
  console.error(err);
  if (/^\/api\/v\d/.test(req.url)) {
    res.json({err});
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
