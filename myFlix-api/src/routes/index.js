const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

module.exports = router;
