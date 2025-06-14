const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const User = require('../models/User');

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // Exclude password from response
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/updateuser', fetchuser, async (req, res) => {
  const { name, email, gender, age, height, weight, goalWeight, goalType } = req.body;

  // Prepare updated fields
  const updatedUser = {};
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (gender) updatedUser.gender = gender;
  if (age) updatedUser.age = age;
  if (height) updatedUser.height = height;
  if (weight) updatedUser.weight = weight;
  if (goalWeight) updatedUser.goalWeight = goalWeight;
  if (goalType) updatedUser.goalType = goalType;

  try {
    // Find user by ID from the middleware (req.user.id)
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update user with new data
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedUser },
      { new: true, runValidators: true }
    ).select("-password"); // exclude password from response

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
