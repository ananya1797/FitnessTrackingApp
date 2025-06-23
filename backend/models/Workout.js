// models/Workout.js
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming your user model is named 'User'
    required: true,
  },
  targetArea: {
    type: String,
    required: true,
    enum: ['legs', 'shoulders', 'thighs', 'abs', 'arms', 'back', 'chest'],
  },
  calories: {
    type: Number,
    required: true,
  },
  time: {
    type: Number, // in minutes
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
