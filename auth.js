const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./models/user');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (!user || !user.validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', {
      expiresIn: '7d',
    });

    res.json({ token });
  });
});

module.exports = router;
