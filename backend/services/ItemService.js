const lockers = require('../models/lockers');

class ItemService {
  async getUsersAll(userId) {
    const lockersArray = await lockers.find({ slots: { $elemMatch: { 'owners._userId': userId, occupied: true } } });

    let items = [];

    for (let locker of lockersArray) {
      const ownedSlots = locker.slots.filter((x) => String(x._userId) === String(userId));

      items.append(ownedSlots);
    }

    return items;
  }
}

module.exports = new ItemService();
