const db = require('../models');
const userService = require('../services/user')(db.sequelize);

module.exports = (req, res, next) => {
    console.log(req.body);
    console.log('+++++++++++++++++++++++++++++');
    next();
    // if (req.body.TOKEN) {
    //     console.log('-----------------------------------');
    //     userService.checkToken(req.body.TOKEN, (error, result) => {
    //         if (error) {
    //             return res.send(error);
    //         }
    //         if (!result) {
    //             return res.send(new Error('Not access token'));
    //         }
    //         return next();
    //     });
    // }
    // res.send(new Error('Not access token'));
    // res.end;
};