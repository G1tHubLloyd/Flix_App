const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwtService = require('../services/jwt.service');

exports.signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

        const existing = await User.findOne({ username });
        if (existing) return res.status(409).json({ message: 'User exists' });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hash });

        res.status(201).json({ id: user._id, username: user.username });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwtService.signToken({ id: user._id, username: user.username });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};
