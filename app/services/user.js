const _ = require('underscore')

module.exports = function(sequelize) {
    let User = require('../models/users')(sequelize).User

    return {
        addNewUser: function(user, cb) {
            User.create(user)
                .then(function(instance) {
                    return cb(null, _.clone(instance.dataValues))
                })
                .catch(function(error) {
                    return cb(error)
                })
        },
        login: function(email, password, cb) {
            var isSuccessful = true
            User.findOne({
                where: { email: email }
            })
                .then(function(instance) {
                    if(!instance) {
                        return cb(null, false)
                    }
                    const user = _.clone(instance.dataValues)
                    if(user.password !== password) {
                        isSuccessful = false
                        return cb(null, false)
                    }
                    instance.last_logged_in = sequelize.fn('NOW')
                    return instance.save({ silent: true })
                })
                .then(function() {
                    return cb(null, true)
                })
                .catch(function(error) {
                    return cb(error)
                })
        },
        changePassword: function(email, oldPassword, newPassword, cb) {
            const service = this
            service.login(email, oldPassword, function(error, isSuccessful) {
                if(error) {
                    return cb(error)
                }
                if(!isSuccessful) {
                    let err = new Error('Cannot change password')
                    err.code = 'Cannot change pass'
                    return cb(err)
                }
                User.update({ password: newPassword }, { where: { email: email } })
                    .then(function() {
                        return cb(null, true)
                    })
                    .catch(function(error) {
                        return cb(error)
                    })
            })
        }
    }
}

