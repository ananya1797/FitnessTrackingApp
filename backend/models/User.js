const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    goalWeight: {
  type: Number,
  required: true
},
goalType: {
  type: String,
  enum: ['gain', 'lose', 'maintain'],
  required: true
},
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.user || mongoose.model('user', UserSchema);
