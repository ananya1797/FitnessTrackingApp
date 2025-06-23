const express = require('express');
const axios = require('axios');
const router = express.Router();
const Workout = require('../models/Workout');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');


// Log a workout for the authenticated user
router.post('/logworkout', fetchuser, async (req, res) => {
  const { targetArea, calories, time } = req.body;
  const userId = req.user.id; // 🔐 Securely extracted from JWT token
  const todayDate = new Date().toISOString().split('T')[0];

  // ✅ Step 2: Sanitize inputs
  const cleanNumber = (val) => Number(val) || 0;

  try {
    // ✅ Step 3: Verify user exists (optional but good for safety)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Cannot log workout.' });
    }

    const newWorkout = new Workout({
      userId,
      targetArea,
      calories: cleanNumber(calories),
      time: cleanNumber(time),
      date: todayDate
    });

    await newWorkout.save();
    res.status(201).json({ message: 'Workout log saved successfully.' });
  } catch (error) {
    console.error('Error logging workout:', error.message);
    res.status(500).json({ error: 'Could not log workout' });
  }
});

// Get all workouts for the authenticated user
router.get('/myworkouts', fetchuser, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error.message);
    res.status(500).json({ error: 'Could not fetch workouts' });
  }
});

module.exports = router;