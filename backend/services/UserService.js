const users = require('../models/users');

class UserService {
  async get(id) {
    return await users.findById(id);
  }

  async updateEmail(id, email) {
    if (users.findOne({ email: email })) {
      return { success: false };
    }

    const user = await users.findByIdAndUpdate(id, { email: email }, { new: true });

    return { success: true, user: user };
  }
}

module.exports = new UserService();
