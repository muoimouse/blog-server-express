const express = require('express');
const router  = express.Router();
const db      = require('../models');
const articleService = require('../services/article')(db.sequelize);

module.exports = (app) => {
    app.use('/article', router);
};

router.put('/', (req, res, next) => {
    let article = req.body;
    articleService.save(article, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: 'successful'
        });
    });
});
router.post('/', (req, res, next) => {
    let article = req.body;
    articleService.update(article, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: 'successful'
        });
    });
});
router.delete('/', (req, res, next) => {
    articleService.delete(req.id, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: 'successful'
        })
    });
});