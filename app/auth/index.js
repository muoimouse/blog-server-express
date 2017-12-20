'use strict';
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

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

/**
 * add JsonWebToken to module passport
 */
passport.use(new strategyJwt({
    secretOrKey: auth.database.secretOrKey,
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt')
}, (payload, done) => {
    userService.checkPayload(payload.id, function (error, result) {
        if (error) {
            return done('Not access');
        }
        if (!result) {
            return done('Not access');
        }
        return done(null, { id: payload.id });
    });
}));

/**
 * add authen with facebook to module passport
 */
passport.use(new FACEBOOK_STRATEGY({
    clientID: auth.facebook.clientID,
    clientSecret: auth.facebook.clientSecret,
    callbackURL: auth.facebook.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    return callback(accessToken, refreshToken, profile, done);
}));

/**
 * add authen with twiter to module passport
 */
passport.use(new TWITTER_STRATEGY({
    consumerKey: auth.twitter.consumerKey,
    consumerSecret: auth.twitter.consumerSecret,
    callbackURL: auth.twitter.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    return callback(accessToken, refreshToken, profile, done);
}));

/**
 * add authen with github to module passport
 */
passport.use(new GITHUB_STRATEGY({
    clientID: auth.github.clientID,
    clientSecret: auth.github.clientSecret,
    callbackURL: auth.github.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    return callback(accessToken, refreshToken, profile, done);
}));

/**
 * @function callback
 * @param {*} accessToken 
 * @param {*} refreshToken 
 * @param {*} profile 
 * @param {*} done 
 */
function callback(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}

/**
 * export module passport
 */
module.exports = passport;