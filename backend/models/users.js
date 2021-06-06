const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  auth: {
    magicToken: String,
    createdAt: Date,
  },
});

module.exports = mongoose.model('user', schema);
