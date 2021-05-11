const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const config = require('./configs/config');

let mailerConfig = {
  host: config.smtp.host,
  port: config.smtp.port,

  auth: {
    user: config.smtp.username,
    pass: config.smtp.password,
  },
};

const getTransport = nodemailer.createTransport(mailerConfig);

const sendTemplate = (template, values, templateValues) => {
  const magicTemplate = handlebars.compile(fs.readFileSync(template, 'utf-8'));

  let message = {
    from: values.from,
    to: values.to,
    subject: values.subject,
    html: magicTemplate(templateValues),
  };

  getTransport.sendMail(message);
};

module.exports = {
  getTransport,
  sendTemplate,
};
