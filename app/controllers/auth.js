const express = require('express');
const router = express.Router();
const db = require('../models');
const userService = require('../services/user')(db.sequelize);
// const passport = require('passport');
const passport = require('../auth');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', router);
};

// router token normal
router.post('/token', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password.toString();
    if (!email) {
        let err = new Error('Invalid Email');
        err.status = 400;
        return next(err);
    }
    if (!password) {
        let err = new Error('Invalid password');
        err.status = 400;
        return next(err);
    }
    userService.updateToken(email, password, null, function (error, result) {
        if (error) {
            return res.send(error);
        }
        if (result) {
            return res.json({ token: result });
        }
        return { errorCode: 'UnknownError' };
    });
});

// router token facebook
router.get('/facebook', passport.authenticate('facebook'), function(req, res){});
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),  (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.json({errorCode: 'Not auth'});        
    }
    userService.checkOauthId(req.user.oauthId, (err, result) => {
        if (err) {
            return res.send(err);
        }
        if (!result) {
            return res.send(new Error('Not token'));
        }
        return res.send({ token: result.token });
    });
});


