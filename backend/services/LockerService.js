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

  async getCommands(lockerId, key) {
    let locker = await lockers.findOne({ _id: lockerId, key: key });

    const commands = locker.commands;

    locker.commands = [];
    locker.save();

    return commands;
  }

  async addCommand(lockerId, command) {
    let locker = await lockers.findOne({ _id: lockerId });

    locker.commands.push(command);
    locker.save();

    return locker.commands;
  }
}

module.exports = new LockerService();
