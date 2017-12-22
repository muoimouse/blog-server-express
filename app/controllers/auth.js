const express = require('express');
const router = express.Router();
const db = require('../models');
const userService = require('../services/user')(db.sequelize);
const passport = require('../auth');

const errorCodes = {
    AuthenticateError: 'AuthenticateError',
    InvalidEmail: 'InvalidEmail',
    InvalidPassword: 'InvalidPassword',
    NotToken: 'NotToken',
    UnknownError: 'UnknownError'
};
/**
 * export module auth
 * @param { Object } app 
 */
module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', router);
};

/**
 * router authenticate with account
 */
router.post('/token', function (req, res) {
    var email = req.body.email;
    var password = req.body.password.toString();
    if (!email) {
        return res.json({ errorCode: errorCodes.InvalidEmail });
    }
    if (!password) {
        return res.json({ errorCode: errorCodes.InvalidPassword });
    }
    userService.updateToken(email, password, null, function (error, result) {
        if (error) {
            return res.json({ errorCode: errorCodes.UnknownError });
        }
        if (result) {
            return res.json({ token: result });
        }
    });
});

/**
 * router authenticate with facebook
 */
router.get('/facebook', passport.authenticate('facebook'), function(req, res){});
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),  (req, res) => {
    callback(req, res);
});

/**
 * router authenticate with twiter
 */
router.get('/twitter', passport.authenticate('twitter'), (req, res) => {});
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    callback(req, res);
});

/**
 * router authenticate with github
 */
router.get('/github', passport.authenticate('github'), (req, res) => {});
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    callback(req, res);
});

/**
 * router authenticate with google
 */
router.get('/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }
));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    callback(req, res);
});

/**
 * router authenticate with instagram
 */
router.get('/instagram', passport.authenticate('instagram'), (req, res) => {});
router.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
    callback(req, res);
});

/**
 * @function callback
 * @param req
 * @param res
 */
function callback(req, res) {
    let profile = req.user;
    userService.checkOauthId(profile.id, (error, result) => {
        if (error) {
            return res.json({ errorCode: errorCodes.AuthenticateError });
        }
        console.log('------------------------------');
        console.log(result);
        if (!result) {
            let newUser = {
                user_name: profile.displayName || profile.username,
                oauthId: profile.id
            };
            return userService.addNewUser(newUser, (error, created) => {
                if (error) {
                    return res.json({ errorCode: errorCodes.AuthenticateError });
                }
                if (created) {
                    let token = created.token;
                    return res.json({ token: token });
                }
            });
        }
        if (result) {
            return res.json({ token: result.token });
        }
    });
}

