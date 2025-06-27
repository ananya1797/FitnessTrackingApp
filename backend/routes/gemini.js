const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config();

router.post('/chat',fetchuser, async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ],
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }
);

    

    const reply = response.data.candidates[0]?.content?.parts[0]?.text || "No response.";
    res.json({ reply });
  } catch (error) {
    console.error('Gemini error:', error.response?.data || error.message || error);
    res.status(500).json({ error: error.response?.data || error.message || "Unknown error" });
  }
});

module.exports = router;
