const http = require('http');
const mongoose = require('../libs/mongoose');

class HttpError extends Error {
  constructor(status, message) {
    super();
    this.name = 'HttpError';
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || 'Error';
    Error.captureStackTrace(this, HttpError);
  }
}

module.exports = {
  HttpError,
  MongooseError: mongoose.Error
};