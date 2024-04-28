const User = require("../../models/User");

class UserService {
  static async getListUser() {
    const users = await User.find({ role: { $ne: "ADMIN" } })
      .select(["_id", "fullName", "email"])
      .lean();
    return users;
  }

  static async updateUser(data) {
    const { role, userId } = data.role;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      {
        new: true,
      }
    );
  }

  static async deleteUser(userId) {
    await User.findByIdAndDelete(userId);
  }
}

module.exports = UserService;
