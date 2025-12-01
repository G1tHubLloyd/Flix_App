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

// GET /movies/:id - get a single movie
router.get('/:id', (req, res) => {
    const id = req.params.id
    const movie = sampleMovies.find(m => String(m.id) === String(id))
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
    res.json(movie)
})

// POST /movies - create a new movie (public)
router.post('/', (req, res) => {
    const { title, description, director, genre } = req.body
    if (!title) return res.status(400).json({ message: 'Title is required' })
    const maxId = sampleMovies.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0)
    const newMovie = {
        id: maxId + 1,
        title,
        description: description || '',
        director: director || '',
        genre: genre || null,
    }
    sampleMovies.unshift(newMovie)
    res.status(201).json(newMovie)
})

// PUT /movies/:id - update an existing movie
router.put('/:id', (req, res) => {
    const id = req.params.id
    const idx = sampleMovies.findIndex(m => String(m.id) === String(id))
    if (idx === -1) return res.status(404).json({ message: 'Movie not found' })
    const { title, description, director, genre } = req.body
    const updated = Object.assign({}, sampleMovies[idx], { title, description, director, genre })
    sampleMovies[idx] = updated
    res.json(updated)
})

// DELETE /movies/:id - delete a movie
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const idx = sampleMovies.findIndex(m => String(m.id) === String(id))
    if (idx === -1) return res.status(404).json({ message: 'Movie not found' })
    const [deleted] = sampleMovies.splice(idx, 1)
    res.json(deleted)
})

module.exports = router;
