const express = require("express");
const { AuthController } = require("../controllers/authController");
const router = express.Router();

// Signup
router.post("/signup", AuthController.signup);
// Login
router.post("/login", AuthController.login);


module.exports = router;