const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const fetchuser = require('../middleware/fetchuser');

router.post('/', fetchuser, async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  try {
    const contact = new Contact({
      userId: req.user.id, // ✅ Available due to fetchuser
      name,
      message
    });

    await contact.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (err) {
    console.error('❌ Error saving contact:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
