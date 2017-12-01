var passport = require('passport'),
    passportJWT = require('passport-jwt'),
    config = require('../../config/config'),
    extractJwt = passportJWT.ExtractJwt,
    strategyJwt = passportJWT.Strategy,
    auth = config.auth
const db = require('../models')
const userService = require('../services/user')(db.sequelize)

const params = {
    secretOrKey: auth.secretOrKey,
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt')
}

var jwtStrategy = new strategyJwt(params, function (payload, done) {
    userService.checkPayload(payload.id, function (error, result) {
        if ( error ) {
            return done('Not access')
        }
        if ( !result ) {
            return done('Not access')
        }
        return done(null, { id: payload.id })
    })
})
passport.use(jwtStrategy)
// module.exports.initialize = passport.initialize()
module.exports.isJwtAuthenticated = passport.authenticate('jwt', { session: false })
