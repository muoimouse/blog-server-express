const db = require('../models');
const userService = require('../services/user')(db.sequelize);

module.exports = (req, res, next) => {
    let token = req.body.TOKEN || req.headers.token || req.query.token;
    if (token) {
        userService.checkToken(token, (error, result) => {
            if (error) {
                return res.json({errorCode: 'NotAccessToken'});
            }
            if (!result) {
                return res.json({errorCode: 'NotAccessToken'});
            }
            next();
        });
    } else {
        return res.json({errorCode: 'NotAccessToken'});
    }
};