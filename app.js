const express = require('express');
const config = require('./config/config');
const db = require('./app/models');
const session =  require('express-session');
const app = express();
// app.use(session);
app.use(session({
    secret: 'cookie_secret',
    name: 'cookie_names',
    // store: 'sessionStore', // connect-mongo session store
    // proxy: true,
    resave: false,
    saveUninitialized: true
}));

module.exports = require('./config/express')(app, config);

db.sequelize
    .sync()
    .then(() => {
        if ( !module.parent ) {
            app.listen(config.port, () => {
                console.log('Express server listening on port ' + config.port);
            });
        }
    }).catch((e) => {
    throw new Error(e);
});

