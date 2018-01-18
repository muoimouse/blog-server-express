const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'blog-server'
        },
        port: process.env.PORT || 1337,
        db_config: {
            database: 'blog',
            username: 'root',
            password: 'password',
            options: {
                dialect: 'mysql',
                timezone: '+07:00',
                host: 'mysql',
                port: '3306'
            }
        },
        auth: {
            database: {
                secretOrKey: 'ad123!$@#'
            },
            facebook: {
                clientID: '495811087468858',
                clientSecret: '7b9fe411941f906a13ee7f7c3cc525fd',
                callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
            },
            twitter: {
                consumerKey: '1nGXjtSuKWvvtqLYZhGAv6oSA',
                consumerSecret: 'e1mc0NvjmHROVjokakeDEesim1ipz5gZ6olGpbUmSVfTL3mRgq',
                callbackURL: 'http://127.0.0.1:1337/auth/twitter/callback'
            },
            github: {
                clientID: '21cc0bca627862bc9f1c',
                clientSecret: '64daba8c5c7908ae1213c0cb7e971b0cd16d934a',
                callbackURL: 'http://127.0.0.1:1337/auth/github/callback'
            },
            google: {
                clientID: '169591644584-ngk4nipg3krguive9o3m3is53cm161f7.apps.googleusercontent.com',
                clientSecret: 'SEsWMCKuE8U1MdtM2VYlNVip',
                callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
            },
            instagram: {
                clientID: '25f10d4abda44785aa7f38bdba9550f5',
                clientSecret: '3f0b05a74f034059a88e7b0b611bfea9',
                callbackURL: 'http://127.0.0.1:1337/auth/instagram/callback'
            }
        }
    },

    test: {
        root: rootPath,
        app: {
            name: 'blog-server'
        },
        port: process.env.PORT || 1337,
        db: 'mysql://localhost/blog-server-test'
    },

    production: {
        root: rootPath,
        app: {
            name: 'blog-server'
        },
        port: process.env.PORT || 1337,
        db: 'mysql://localhost/blog-server-production'
    }
};

module.exports = config[env];
