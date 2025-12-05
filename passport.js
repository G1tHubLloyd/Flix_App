const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Models = require('./models/user');
const User = Models;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, done) => {
      return User.findById(jwtPayload._id)
        .then(user => done(null, user))
        .catch(err => done(err, false));
    }
  )
);
