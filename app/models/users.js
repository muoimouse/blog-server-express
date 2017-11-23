const Sequelize = require('sequelize')
module.exports = function (sequelize) {
  var user = sequelize.define('User', {
    username: { type: Sequelize.STRING(250), allowNull: false, unique: true },
    password: { type: Sequelize.String(16), allowNull: false },
    last_logged_in: Sequelize.DATE,
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