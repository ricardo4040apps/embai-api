const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config/app");
const passport = require("passport");

module.exports = function(req, res, next) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

    opts.secretOrKey = config.database.secret;
    //opts.issuer = 'accounts.examplesoft.com';
    //opts.audience = 'yoursite.net';
    passport.authenticate(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.getById(jwt_payload._id, (err, user) => {
                if (err) {
                    res.status(401).send("Unauthorized");
                    return;
                }
                if (user) {
                    //if (Forbidden) res.status(401).send("Forbidden");
                    if (req.route.path != '/protected/example2'){
                        next();
                    } else {
                        res.status(403).send("Forbidden");
                    }
                } else {
                    res.status(401).send("");
                    // or you could create a new account
                }
            });
        })
    )(req, res, next);
};


// https://www.npmjs.com/package/passport-jwt
// https://www.youtube.com/watch?v=6pdFXmTfkeE&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ&index=4
