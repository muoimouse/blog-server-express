const passport = require('passport');
const passportFB = require('passport-facebook');
const strategyfb = passportFB.Strategy;
const passportJWT = require('passport-jwt');
const config = require('../../config/config');
const extractJwt = passportJWT.ExtractJwt;
const strategyJwt = passportJWT.Strategy;
const auth = config.auth;
const db = require('../models');
const userService = require('../services/user')(db.sequelize);

const jwtOptions = {
    secretOrKey: auth.secretOrKey,
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt')
};

let jwtStrategy = new strategyJwt(jwtOptions, function (payload, done) {
    userService.checkPayload(payload.id, function (error, result) {
        if (error) {
            return done('Not access');
        }
        if (!result) {
            return done('Not access');
        }
        return done(null, { id: payload.id });
    });
});

let fbOptions = {
    clientID: 495811087468858,
    clientSecret: '7b9fe411941f906a13ee7f7c3cc525fd',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
};

let fbStrategy = new strategyfb(fbOptions, function(accessToken, refreshToken, profile, done){
    userService.checkPayload(profile.id, function(error, result) {
        if(error) {
            return done('Not access');
        }
        if (!result) {
            return done('Not access');
        }
        return done(null, {id: profile.id});
    });
});

passport.use(jwtStrategy);
passport.use(fbStrategy);
// module.exports.initialize = passport.initialize()
module.exports.isJwtAuthenticated = passport.authenticate('jwt', { session: false });
