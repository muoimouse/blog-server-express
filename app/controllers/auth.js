const express = require('express'),
    router = express.Router(),
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
    userService.updateToken(email, password, function(error, result) {
        if ( error ) {
            return res.send(error)
        }
        return res.json({ token: result })
    })
})
