'use strict'
const Sequelize = require('sequelize')
module.exports = function (sequelize) {
  let user = sequelize.define('User', {
    email: { type: Sequelize.STRING(250), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(16), allowNull: false },
    last_logged_in: {type: Sequelize.DATE, defaultValue: Date},
    status: { type: Sequelize.BOOLEAN, defaultValue: true }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'users'
  })
  return {
    User: user
  }
}