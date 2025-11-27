const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const Models = require('./models.js');
const Movies = Models.Movie; // import once

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

// ✅ Connect to MongoDB Atlas via Heroku config var
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ✅ Get all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movies.find();
        res.json(movies);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ✅ Add new movie
app.post('/movies', async (req, res) => {
    try {
        const movie = await Movies.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a single movie by ID
app.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.json(movie);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a New User
app.post('/users', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a Movie to a User’s Favorites
app.post('/users/:id/movies/:movieId', async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      { $push: { FavoriteMovies: req.params.movieId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to myFlix API!');
});

// Listen on port (Heroku provides PORT)
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});
