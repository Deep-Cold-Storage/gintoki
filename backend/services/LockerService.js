const lockers = require('../models/lockers');

class LockerService {
  async create(name, location, slots) {
    const locker = new lockers({ name: name, location: location, slots: slots });
    locker.save();

    return locker;
  }

  async getAll() {
    return await lockers.find();
  }

  async getOne(lockerId) {
    return await lockers.findOne({ _id: lockerId });
  }
}

module.exports = new LockerService();
