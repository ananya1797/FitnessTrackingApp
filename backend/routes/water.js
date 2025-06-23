const express = require('express');
const axios = require('axios');
const router = express.Router();
const Water = require('../models/Water');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
// Log water intake for the authenticated user

router.post('/log', fetchuser, async (req, res) => {
  const { glasses } = req.body;
  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Check if a log already exists for today
    const existingLog = await Water.findOne({ userId, date: today });
    if (existingLog) {
      existingLog.glasses += Number(glasses);
      await existingLog.save();
      return res.status(200).json({ message: 'Water intake updated for today.' });
    }

    const newLog = new Water({
      userId,
      glasses: Number(glasses),
      date: today
    });

    await newLog.save();
    res.status(201).json({ message: 'Water intake logged successfully.' });
  } catch (err) {
    console.error('Error logging water intake:', err.message);
    res.status(500).json({ error: 'Could not log water intake' });
  }
});
router.get('/fetchlog', fetchuser, async (req, res) => {
  try {
    const waterLogs = await Water.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(waterLogs);
  } catch (error) {
    console.error('Failed to fetch water logs', error.message);
    res.status(500).json({ error: 'Server error fetching water logs' });
  }
});


    module.exports = router;