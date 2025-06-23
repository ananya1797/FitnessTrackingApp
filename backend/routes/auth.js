const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET;

// Create User route (signup)
router.post('/createUser', [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('gender', 'Enter M or F').isIn(['M', 'F']),
    body('age', 'Age must be a number').isNumeric(),
    body('height', 'Height must be a number').isNumeric(),
    body('weight', 'Weight must be a number').isNumeric(),
    body('goalWeight', 'Goal weight must be a number').isNumeric(),
    body('goalType', 'Goal type must be either gain, lose, or maintain').isIn(['gain', 'lose', 'maintain'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ error: "User with this email already exists" });

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            gender: req.body.gender,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            goalWeight: req.body.goalWeight,
            goalType: req.body.goalType
        });

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Login route
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User with that email doesn't exist" });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(400).json({ error: "Wrong password, try again" });

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
