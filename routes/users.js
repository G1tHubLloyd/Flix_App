const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Register new user
router.post('/', (req, res) => {
    const hashedPassword = User.hashPassword(req.body.password);

    User.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday,
    })
        .then(user => res.json(user))
        .catch(err => res.status(500).send('Error: ' + err));
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
