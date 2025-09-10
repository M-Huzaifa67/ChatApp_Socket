

const { messages } = require("../models/messages");
const { users } = require("../models/users");

function getUsers(req, res) {
  const enhancedUsers = users.map(u => {
    // find last message between loggedInUser and this user
    const lastMsg = messages
      .filter(m => m.sender === u.userId || m.receiver === u.userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    return {
      ...u,
      lastMessage: lastMsg ? lastMsg.text : "",
    };
  });

  res.json({ users: enhancedUsers });
}

module.exports = { getUsers };