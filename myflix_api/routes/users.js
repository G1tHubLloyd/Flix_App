const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Register new user
router.post('/', async (req, res) => {
    try {
        console.log('Received signup request:', req.body);

        // Validate required fields
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).json({
                message: 'Missing required fields',
                required: ['username', 'password', 'email']
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        console.log('Hashing password...');
        const hashedPassword = User.hashPassword(req.body.password);
        console.log('Password hashed successfully');

        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            birthday: req.body.birthday,
        });

        console.log('User created:', user.username);
        res.status(201).json({
            message: 'User created successfully',
            user: { username: user.username, email: user.email }
        });
    } catch (err) {
        console.error('User creation error:', err);
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

// Show all users (protected)
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).send('Error: ' + err));
});

// Add a movie to user's favorites
router.post('/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $push: { favoriteMovies: req.params.movieId } },
        { new: true }
    )
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).send('Error: ' + err));
});

router.get('/public', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).send('Error: ' + err));
});

module.exports = router;
