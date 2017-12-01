const passport = require('passport');
const passportFB = require('passport-facebook');
const passportJWT = require('passport-jwt');
const config = require('../../config/config');
const extractJwt = passportJWT.ExtractJwt;
const strategyJwt = passportJWT.Strategy;
const auth = config.auth;
const db = require('../models');
const userService = require('../services/user')(db.sequelize);

const params = {
    secretOrKey: auth.secretOrKey,
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt')
};

var jwtStrategy = new strategyJwt(params, function (payload, done) {
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
passport.use(jwtStrategy);
// module.exports.initialize = passport.initialize()
module.exports.isJwtAuthenticated = passport.authenticate('jwt', { session: false });
