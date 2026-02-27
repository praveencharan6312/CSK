const express = require('express');
const router = express.Router();
const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username already taken" });
    }

    // Create new user
    const newUser = await User.create({ username, password });
    res.json({ success: true, message: "Signup successful", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      // Record login history
      await LoginHistory.create({ userId: user._id });
      res.json({ success: true, message: "Login successful", userId: user._id });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Fetch login history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await LoginHistory.find({ userId: req.params.userId }).sort({ loginTime: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching history", error: err.message });
  }
});

module.exports = router;
