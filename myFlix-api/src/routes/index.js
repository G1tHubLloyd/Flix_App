const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const moviesRouter = require('./movies');

router.use('/auth', authRouter);
router.use('/movies', moviesRouter);

module.exports = router;
