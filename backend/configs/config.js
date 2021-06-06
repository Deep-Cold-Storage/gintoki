require('dotenv').config();

module.exports = {
  mongo: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  magic: {
    prefix: process.env.MAGIC_URL_PREFIX,
    from: process.env.MAGIC_FROM,
  },
};
