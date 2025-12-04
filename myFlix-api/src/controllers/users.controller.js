const User = require('../models/user.model');

exports.getAll = async (req, res, next) => {
    try {
        // Omit password field for safety
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        next(err);
    }
};
