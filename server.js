const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('./passport'); // JWT strategy
const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');
const auth = require('./auth');
const usersRouter = require('./routes/users');

const app = express();

// Mount routers
app.use('/users', usersRouter);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Database connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myflixDB';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Mongoose connected to MongoDB');
    })
    .catch(err => {
        console.error('❌ Mongoose connection error:', err);
    });

// Routes
app.use('/auth', auth);
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
