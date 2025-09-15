
const { messages } = require("../models/messages");
const { users } = require("../models/users");

class UserController {
  constructor() {}
  // Get users with last message
  static getUsers(req, res) {
    console.log("🚀 Get Users endpoint hit!");
  const usersList = users.map(u => {
    // find last message between loggedInUser and this user
    const lastMsg = messages
      .filter(m => m.sender === u.userId || m.receiver === u.userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    return {
      ...u,
      lastMessage: lastMsg ? lastMsg.text : "",
    };
  });

  res.json(usersList);
}
}




module.exports = { UserController };