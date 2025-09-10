const { messages } = require("../models/messages");
const { users } = require("../models/users");
const { generateId } = require("../utils/generateId");

// Signup
function signup(req, res) {
    // return res.json({
    //     messages: "Signed up success"
    // });
    const { userId, username } = req.body;

    if (!username || !userId) {
        return res.status(400).json({ error: "All fields required" });
    }

    const existing = users.find(u => u.userId === userId);
    if (existing) {
        return res.status(200).json({ user: existing }); // ✅ return same user instead of adding again
    }

    const newUser = {
        // id: generateId(),
        userId,
        username,
    };

    users.push(newUser);
    console.log(username, "registered success");
    return res.json({ message: "User registered", user: newUser });
}

// Login (dummy, just checks username exists)
function login(req, res) {
    const { username } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Login successful", user });
}

module.exports = { signup, login };
