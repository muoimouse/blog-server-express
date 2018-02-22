const express = require('express');
const router  = express.Router();
const db      = require('../models');
const articleService = require('../services/article');

module.exports = (app) => {
    app.use('/article', router);
};