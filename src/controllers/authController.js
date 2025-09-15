const { users } = require("../models/users");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor() {}

  // Signup
static signup(req, res) {
  console.log("🚀 Signup endpoint hit!");
  console.log("📝 Request body:", req.body);
  // console.log("📝 Headers:", req.headers);

  const { userId, username, email, password } = req.body;

  if (!userId || !username || !email || !password) {
    return res.status(400).json({ error: "required all signup fields" });
  }

  // check if user already exists
  let user = users.find(u => u.userId === userId);
  if (user) {
    const jwtToken = jwt.sign({ userId: user.userId }, "SECRET_KEY");
    return res.json({ user, jwtToken });
  }


  const jwtToken = jwt.sign({ userId: userId }, "SECRET_KEY");

  user = {userId,username,email,password,jwtToken,socketId:"",online:false,lastMessage:"",avatarUrl:""};
  users.push(user);

  return res.json(user);
}



static login(req, res) {
    console.log("🚀 Login endpoint hit!");
    const { username } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
}

}







module.exports = { AuthController};
