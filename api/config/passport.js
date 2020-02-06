const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = (passport) => {
    var opts = {}
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    //opts.issuer = 'accounts.examplesoft.com';
    //opts.audience = 'yoursite.net';

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
    
}




// https://www.npmjs.com/package/passport-jwt
// https://www.youtube.com/watch?v=6pdFXmTfkeE&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ&index=4