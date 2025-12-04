const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All movie routes require authentication
router.get('/', authenticateToken, moviesController.getAll);
router.get('/:id', authenticateToken, moviesController.getById);

module.exports = router;
