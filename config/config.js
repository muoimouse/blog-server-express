const path = require('path')
const rootPath = path.normalize(__dirname + '/..')
const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'blog-server'
    },
    port: process.env.PORT || 3000,
    // db: 'mysql://localhost/blog-server-development'
    db_config: {
      database: 'blog',
      username: 'root',
      password: '1',
      options: {
        dialect: 'mysql',
        timezone: "+07:00",
        host: 'localhost',
        port: '3306'
      }
    },
    auth: {
      secretOrKey: 'zxczxczcx'
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'blog-server'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/blog-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'blog-server'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/blog-server-production'
  }
}

module.exports = config[env]
