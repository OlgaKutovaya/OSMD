const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport(config.mailer.yandex);

module.exports = transporter;