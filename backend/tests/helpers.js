const jwt = require('jsonwebtoken');
const users = require('../models/users');
const lockers = require('../models/lockers');

const getAuthToken = () => {
  let user = new users({ email: 'testing@gmail.com' });
  user.save();

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });
};

const getLocker = () => {
  let locker = new lockers({ name: 'Locker', location: [21.973228, 50.015645], slots: [{ pin: 1 }, { pin: 2 }, { pin: 3 }] });
  locker.save();

  return locker;
};

module.exports = {
  getAuthToken,
  getLocker,
};
