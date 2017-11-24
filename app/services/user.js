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
                    var user = _.clone(instance.dataValues)
                    if(user.password !== password) {
                        isSuccessful = false
                        return
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
            var service = this
            service.login(email, oldPassword, function(error, isSuccessful) {
                if(error) {
                    return cb(error)
                }
                if(!isSuccessful) {
                    return cb(new Error('Cannot change password'))
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

