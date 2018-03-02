const express = require('express');
const router = express.Router();
const db = require('../models');
const commentService = require('../services/comment')(db.sequelize);

const errorCodes = {

};

module.exports = (app) => {
    app.use('/comment', router);
};
