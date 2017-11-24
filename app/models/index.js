const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/config')
const dbConfig = config.db_config
const db = {}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options)

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ( 'associate' in db[modelName] ) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db