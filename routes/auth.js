const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the Model

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existing = await User.findOne({ username });
        if (existing) return res.json({ success: false, message: "Username already taken!" });
        await new User({ username, password, role: "student" }).save();
        res.json({ success: true, message: "Registration successful!" });
    } catch (err) { res.status(500).json({ success: false }); }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) res.json({ success: true, role: user.role, username: user.username });
        else res.status(401).json({ success: false, message: "Invalid Credentials" });
    } catch (err) { res.status(500).json({ success: false }); }
});

module.exports = router;