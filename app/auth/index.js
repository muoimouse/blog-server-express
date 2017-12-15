const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../../config/config');
const extractJwt = passportJWT.ExtractJwt;
const strategyJwt = passportJWT.Strategy;
const auth = config.auth;
const db = require('../models');
const userService = require('../services/user')(db.sequelize);

const FACEBOOK_STRATEGY = require('passport-facebook').Strategy;
const TWITTER_STRATEGY = require('passport-twitter').Strategy;
const GITHUB_STRATEGY = require('passport-github2').Strategy;
const GOOGLE_STRATEGY = require('passport-google-oauth2').Strategy;
const INSTAGRAM_STRATEGY = require('passport-instagram').Strategy;

const jwtOptions = {
    secretOrKey: auth.database.secretOrKey,
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

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new FACEBOOK_STRATEGY({
    clientID: auth.facebook.clientID,
    clientSecret: auth.facebook.clientSecret,
    callbackURL: auth.facebook.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    userService.checkOauthId(profile.id, (error, result) => {
        if (error) {
            return done('Not access');
        }
        if (!result) {
            let newUser = {
                user_name: profile.displayName,
                oauthId: profile.id
            };
            userService.addNewUser(newUser, (error, created) => {
                if (error) {
                    return done(error);
                }
                userService.updateToken(null, null, profile.id, (error, result) => {
                    if (error) {
                        return done(error);
                    }
                    if (!result) {
                        return done(new Error('UnknownError'));
                    }
                    return done();
                });
                return done(null, { oauthId: created.oauthId });
            });
        }
        return done(null, { oauthId: profile.id });
    });
}
));

passport.use(jwtStrategy);
// module.exports.initialize = passport.initialize()
// module.exports.isJwtAuthenticated = passport.authenticate('jwt', { session: false });
module.exports = passport;