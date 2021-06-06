const lockers = require('../models/lockers');

class LockerService {
  async create(name, location, slots) {
    const locker = new lockers({ name: name, location: location, slots: slots });
    locker.save();

    return locker;
  }

  async getAll() {
    let lockersArray = await lockers.find().lean();

    lockersArray = lockersArray.map(function (locker) {
      if (locker.slots.filter((x) => x.occupied == false).length) {
        locker.available = true;
      }

      return locker;
    });

    return lockersArray;
  }

  async getOne(lockerId) {
    let locker = await lockers.findOne({ _id: lockerId }).lean();

    if (locker.slots.filter((x) => x.occupied == false).length) {
      locker.available = true;
    }

    return locker;
  }
}

module.exports = new LockerService();
