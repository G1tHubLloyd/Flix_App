const jwt = require('jsonwebtoken');
const config = require('../config/config');

function signToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
}

module.exports = { signToken };
