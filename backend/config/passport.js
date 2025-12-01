const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

module.exports = function (passportInstance) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET || 'your_jwt_secret';

    passportInstance.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload._id).exec();
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
