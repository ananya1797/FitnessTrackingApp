const mongoose = require('mongoose');
const { Schema } = mongoose;
const nutritionSchema = new mongoose.Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'user', required: true 
    },
  breakfast: Number,
  lunch: Number,
  dinner: Number,
  snack: Number,
  totalCalories: Number,
  date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Nutrition', nutritionSchema);
