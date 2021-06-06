const mongoose = require('mongoose');

const point = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const schema = mongoose.Schema({
  name: String,
  key: String,
  location: {
    type: point,
    required: true,
  },
  slots: [{ name: String, pin: Number, occupied: Boolean, owners: [{ _userId: mongoose.Types.ObjectId }] }],
  commands: [{ action: String, pin: Number }],
});

module.exports = mongoose.model('locker', schema);
