const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport(config.mailer.yandex);

module.exports = transporter;