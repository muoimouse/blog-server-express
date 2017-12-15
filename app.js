const express = require('express');
const config = require('./config/config');
const db = require('./app/models');

const app = express();
// app.use(express.session({ secret: 'secret' }));

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

