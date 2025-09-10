const express = require("express");
const { users } = require("../models/users");
const { messages } = require("../models/messages");

const router = express.Router();

// GET all users with online + lastMessage
router.get("/", (req, res) => {
  const enhancedUsers = users.map(u => {
    const lastMsg = [...messages]
      .filter(m => m.sender === u.userId || m.receiver === u.userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    return {
      userId: u.userId,
      username: u.username,
      online: u.online ?? false,
      lastMessage: lastMsg ? lastMsg.text : "",
    };
  });

  return res.json({ users: enhancedUsers });
});

module.exports = router;
