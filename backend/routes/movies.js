const express = require('express');
const router = express.Router();

const sampleMovies = [
  { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
  { id: 3, title: 'Inception', director: 'Christopher Nolan' }
];

// Public GET /movies - returns sample data
router.get('/', (req, res) => {
  res.json(sampleMovies);
});

module.exports = router;
