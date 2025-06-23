const mongoose = require('mongoose');

const WaterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  glasses: {
    type: Number,
    required: true,
    min: [1, 'Must be at least 1 glass of water']
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0)  // Normalize to midnight
  }
}, { timestamps: true });

module.exports = mongoose.model('Water', WaterSchema);
