const validator = require('validator')
const express = require('express')
const router = express.Router()
const db = require('../models')
const userService = require('../services/user')(db.sequelize)
const auth = require('../auth')

module.exports = function(app) {
    app.use('/user', router)
}
router.get('/', auth.isJwtAuthenticated, function(req, res, next) {
    return res.json({message: "ok"})
})
router.post('/', function(req, res, next) {
    const user = {
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
    const email = req.body.email
    const oldPassword = req.body.old_password
    const newPassword = req.body.new_password
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
        return res.json({ message: isSuccessful ? 'isSuccessful' : 'Fail' })
    })
})

router.delete('/:id', function(req, res, next) {
    userService.removeUserById(req.params.id, function(error, isDeleted) {
        console.log(req.params.id)
        if(error) {
            return next(error)
        }
        return res.json({ message: 'Successful', isdeleted: isDeleted })
    })
})
