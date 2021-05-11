require('dotenv').config();

module.exports = {
  mongo: {
    url: process.env.MONGO_URL,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
};
