const jwt = require('jsonwebtoken');
const users = require('../models/users');

const getAuthToken = () => {
  let user = new users({ email: 'testing@gmail.com' });
  user.save();

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });
};

module.exports = {
  getAuthToken,
};
