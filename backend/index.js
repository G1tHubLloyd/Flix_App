const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/database');
const configurePassport = require('./config/passport');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables if present
require('dotenv').config();

// Connect to database (no-op if MONGO_URI not set and local Mongo isn't running)
connectDB();

// Passport
app.use(passport.initialize());
configurePassport(passport);

// Public routes
app.use('/movies', moviesRouter);
app.use('/', usersRouter);

// To protect the /movies route in future, replace the mount above with:
// app.use('/movies', passport.authenticate('jwt', { session: false }), moviesRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
