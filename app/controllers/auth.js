const express = require('express'),
    router = express.Router(),
    jwt = require('jwt-simple'),
    // config = require('../../config/config'),
    db = require('../models'),
    userService = require('../services/user')(db.sequelize)

module.exports = function(app) {
    app.use('/auth', router)
}

router.post('/token', function(req, res, next) {
    var email = req.body.email
    var password = req.body.password.toString()
    if ( !email ) {
        let err = new Error('Invalid Email')
        err.status = 400
        return next(err)
    }
    if ( !password ) {
        let err = new Error('Invalid password')
        err.status = 400
        return next(err)
    }
    var payload = { id: 'BloBla' }
    var token = jwt.encode(payload, 'muoi')
    userService.updateToken(email, password, token, function(error) {
        if ( error ) {
            return res.send(error)
        }
        return res.json({ token: token })
    })
})