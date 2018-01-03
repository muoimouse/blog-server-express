const express = require('express');
const router = express.Router();
const db = require('../models');
const articleService = require('../services/article')(db.sequelize);
const authenticate = require('../auth/checkToken');

const errorCodes = {

};

module.exports = (app) => {
  app.use('/article', router);
};