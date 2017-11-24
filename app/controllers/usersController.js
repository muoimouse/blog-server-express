const validator = require('validator')
const express = require('express')
const router = express.Router()
const db = require('../models')
const userService = require('../services/user')(db.sequelize)

module.exports = function(app) {
    app.use('/user', router)
}
router.post('/', function(req, res, next) {
    var user = {
        email: req.body.email,
        password: req.body.password
    }
    if(!user.email || !validator.isEmail(user.email)) {
        let err = new Error('Invalid Email')
        err.status = 400
        return next(err)
    }
    if(!user.password) {
        let err = new Error('Invalid password')
        err.status = 400
        return next(err)
    }
    userService.addNewUser(user, function(error, createdUser) {
        if(error) {
            return next(error)
        }
        return res.json({ message: 'successful', data: createdUser })
    })
})
router.put('/change-password', function(req, res, next) {
    var email = req.body.email
    var oldPassword = req.body.old_password
    var newPassword = req.body.new_password
    if(!email || !validator.isEmail(email)) {
        let err = new Error('Invalid email')
        err.status = 400
        return next(err)
    }
    if(!oldPassword || !newPassword) {
        let err = new Error('Invalid Password')
        err.status = 400
        return next(err)
    }
    userService.changePassword(email, oldPassword, newPassword, function(error, isSuccessful) {
        if(error) {
            return next(error)
        }
        return res.json({message: isSuccessful ? "isSuccessful" : "Fail"})
    })
})