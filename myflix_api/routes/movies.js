const express = require('express');
const passport = require('passport');
const Movie = require('../models/movie');

const router = express.Router();

// Protected route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(500).send('Error: ' + err));
});

// Public route: no JWT required
router.get('/public', (req, res) => {
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(500).send('Error: ' + err));
});

module.exports = router;
