const lockers = require('../models/lockers');

class LockerService {
  async getAll() {
    return await lockers.find();
  }
}

module.exports = new LockerService();
