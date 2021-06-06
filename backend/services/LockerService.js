const lockers = require('../models/lockers');

class LockerService {
  async getAll() {
    return await lockers.find();
  }

  async getOne(lockerId) {
    return await lockers.findOne({ _id: lockerId });
  }
}

module.exports = new LockerService();
