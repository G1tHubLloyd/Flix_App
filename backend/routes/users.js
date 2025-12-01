const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Register a new user
router.post('/users', async (req, res) => {
    try {
        const { Username, Password, Email, Birthday } = req.body;
        if (!Username || !Password || !Email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existing = await User.findOne({ Username }).exec();
        if (existing) return res.status(400).json({ message: 'Username already exists' });

        const hashed = User.hashPassword(Password);
        const newUser = new User({ Username, Password: hashed, Email, Birthday });
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login - returns JWT
router.post('/login', async (req, res) => {
    try {
        const { Username, Password } = req.body;
        if (!Username || !Password) return res.status(400).json({ message: 'Missing fields' });
        const user = await User.findOne({ Username }).exec();
        if (!user || !user.validatePassword(Password)) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { _id: user._id, Username: user.Username };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
        res.json({ token: 'Bearer ' + token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Example protected endpoint (get current user)
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ Username: req.user.Username, Email: req.user.Email });
});

module.exports = router;
