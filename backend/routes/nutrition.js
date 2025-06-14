// routes/Nutrition.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Nutrition = require('../models/Nutrition');
const fetchuser = require('../middleware/fetchuser');
const SPOON_API_KEY = '64a6247bc7624c42a9532aa28781ac1d';
const User = require('../models/User'); 

//get nutrient information for a specific food item
// Example endpoint: GET /nutrition/banana
router.get('/:food', async (req, res) => {
  const foodItem = req.params.food;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/guessNutrition`,
      {
        params: {
          title: foodItem,
          apiKey: SPOON_API_KEY,
        },
      }
    );

    const { calories, fat, protein } = response.data;

    res.json({ calories, fat, protein });
  } catch (error) {
    console.error('Error fetching nutrition data:', error.message);
    res.status(500).json({ error: 'Could not fetch nutrition data' });
  }
});

// Log meals for the authenticated user
router.post('/logmeals', fetchuser, async (req, res) => {
  const { breakfast, lunch, dinner, snack, totalCalories } = req.body;
  const userId = req.user.id;  // 🔐 Securely extracted from JWT token
  const todayDate = new Date().toISOString().split('T')[0];
  // ✅ Step 2: Sanitize calories (convert null/undefined to 0 and force numbers)
  const cleanNumber = (val) => Number(val) || 0;

  try {
    // ✅ Step 3: Verify user exists (optional but good for safety)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Cannot log meal.' });
    }

    const newEntry = new Nutrition({
      userId,
      breakfast: cleanNumber(breakfast),
      lunch: cleanNumber(lunch),
      dinner: cleanNumber(dinner),
      snack: cleanNumber(snack),
      totalCalories: cleanNumber(totalCalories),
      date: todayDate
    });

    await newEntry.save();
    res.status(201).json({ message: 'Nutrition log saved successfully.' });

  } catch (err) {
    console.error('Error saving meal log:', err);
    res.status(500).json({ message: 'Server error. Failed to save nutrition log.' });
  }
});


router.get('/mylogs', fetchuser, async (req, res) => {
  try {
    const logs = await Nutrition.find({ userId: req.user.id });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch logs' });
  }
});


module.exports = router;

