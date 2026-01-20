const express = require("express");
const router = express.Router();
const User = require("../models/User");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username});

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "login successful", user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;