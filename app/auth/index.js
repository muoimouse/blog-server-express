var passport = require('passport'),
    passportJWT = require('passport-jwt'),
    config = require('../../config/config'),
    extractJwt = passportJWT.ExtractJwt,
    strategyJwt = passportJWT.Strategy

const params = {
    secretOrKey: 'muoi',
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
}

var jwtStrategy = new strategyJwt(params, function(payload, done) {
    if (payload.id == 'BloBla') {
        return done(null, {id: payload.id})
    } else {
        return done(new Error('Not access'))
    }
})

passport.use('jwt', jwtStrategy)
module.exports.isJwtAuthenticated = passport.authenticate('jwt', {session: false})