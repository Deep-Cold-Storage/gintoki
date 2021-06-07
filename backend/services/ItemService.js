const lockers = require('../models/lockers');
const LockerService = require('../services/LockerService');

class ItemService {
  async getAll(userId) {
    const lockersArray = await lockers.find({ slots: { $elemMatch: { owners: userId, occupied: true } } }).lean();

    let slots = [];

    // Concat all found slots.
    for (let locker of lockersArray) {
      for (let slot of locker.slots) {
        slot.locker = { _id: locker._id, name: locker.name, location: locker.location };

        slots.push(slot);
      }
    }

    let items = [];

    // Filter slots by state and owners.
    for (let item of slots) {
      if (item.occupied == true && item.owners.filter((x) => String(x) == String(userId)).length) {
        items.push(item);
      }
    }

    return items;
  }

  async addItem(userId, name, lockerId) {
    const locker = await lockers.findOne({ _id: lockerId, slots: { $elemMatch: { occupied: false } } });

    if (!locker) {
      return { success: false };
    }

    const freeSlotIndex = locker.slots.findIndex((x) => x.occupied == false);

    await LockerService.addCommand(locker._id, { action: 'open', pin: locker.slots[freeSlotIndex].pin });

    locker.slots[freeSlotIndex].name = name;
    locker.slots[freeSlotIndex].occupied = true;
    locker.slots[freeSlotIndex].owners.push(userId);

    locker.save();

    return { success: true };
  }

  async retrieveItem(userId, slotId) {
    const locker = await lockers.findOne({ slots: { $elemMatch: { _id: slotId, occupied: true, owners: { $in: userId } } } });

    if (!locker) {
      return { success: false };
    }

    const slotIndex = locker.slots.findIndex((x) => String(x._id) == String(slotId));

    await LockerService.addCommand(locker._id, { action: 'open', pin: locker.slots[slotIndex].pin });

    locker.slots[slotIndex].name = null;
    locker.slots[slotIndex].occupied = false;
    locker.slots[slotIndex].owners = [];

    locker.save();

    return { success: true };
  }
}

module.exports = new ItemService();
