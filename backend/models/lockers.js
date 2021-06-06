const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  key: String,
  location: {
    type: [Number],
  },
  slots: [{ name: String, pin: Number, occupied: { type: Boolean, default: false }, owners: [mongoose.Types.ObjectId] }],
  commands: [{ action: String, pin: Number }],
});

module.exports = mongoose.model('locker', schema);
