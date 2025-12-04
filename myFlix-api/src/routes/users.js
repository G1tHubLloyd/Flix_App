const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected: list users (omit sensitive fields)
router.get('/', authenticateToken, usersController.getAll);

module.exports = router;
