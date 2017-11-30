const _ = require('underscore'),
  config = require('../../config/config'),
  auth = config.auth,
  jwt = require('jwt-simple')

module.exports = function (sequelize) {
  let User = require('../models/users')(sequelize).User

  return {
    addNewUser: function (user, cb) {
      User.create(user)
        .then(function (instance) {
          return cb(null, _.clone(instance.dataValues))
        })
        .catch(function (error) {
          return cb(error)
        })
    },
    login: function (email, password, cb) {
      // var isSuccessful = true
      User.findOne({
        where: { email: email }
      })
        .then(function (instance) {
          if ( !instance ) {
            // isSuccessful = false
            return cb(null, false)
          }
          const user = _.clone(instance.dataValues)
          if ( user.password !== password ) {
            // isSuccessful = false
            return cb(null, false)
          }
          instance.last_logged_in = sequelize.fn('NOW')
          instance.save({ silent: true })
          return cb(null, instance)
        })
        // .then(function () {
        //   return cb(null, true)
        // })
        .catch(function (error) {
          return cb(error)
        })
    },
    changePassword: function (email, oldPassword, newPassword, cb) {
      let service = this
      service.login(email, oldPassword, function (error, isSuccessful) {
        if ( error ) {
          return cb(error)
        }
        if ( !isSuccessful ) {
          let err = new Error('Cannot change password')
          err.code = 'Cannot change pass'
          return cb(err)
        }
        User.update({ password: newPassword }, { where: { email: email } })
          .then(function () {
            return cb(null, true)
          })
          .catch(function (error) {
            return cb(error)
          })
      })
    },
    removeUserById: function (id, cb) {
      User.destroy({ where: { id: id } })
        .then(function (number) {
          return number ? cb(null, true) : cb(null, false)
        })
        .catch(function (error) {
          return cb(error)
        })
    },
    updateToken: function (email, password, cb) {
      let service = this
      service.login(email, password, function (error, isSuccessful) {
        if ( error ) {
          let err = new Error()
          err.code = error
          return cb(err)
        }
        if ( !isSuccessful ) {
          let err = new Error('Cannot create token')
          err.status = 400

          return cb(err)
        }
        if ( isSuccessful ) {
          console.log()
          let payload = { id: isSuccessful.dataValues.id }
          let token = jwt.encode(payload, auth.secretOrKey)
          User.update({ token: token }, { where: { email: email } })
            .then(function () {
              return cb(null, token)
            })
            .catch(function (error) {
              return cb(error)
            })
        }
      })
    },
    checkPayload: function (payloadId, cb) {
      User.findOne({ where: { id: payloadId } })
        .then(function (result) {
          if ( !result ) {
            return cb(null, false)
          }
          return cb(null, true)
        })
        .catch(function (error) {
          return cb(error)
        })
    }
  }
}

