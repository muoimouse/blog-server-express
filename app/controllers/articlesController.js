const express = require('express');
const router  = express.Router();
const db      = require('../models');
const articleService = require('../services/article')(db.sequelize);

module.exports = (app) => {
    app.use('/article', router);
};

/**
 * Get all article
 */
router.get('/', (req, res, next) => {

});

/**
 * Add a new article
 */
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

/**
 * Update article
 */
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

/**
 * Delete article
 */
router.delete('/', (req, res, next) => {
    articleService.delete(req.body.id, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json({
            message: 'successful'
        })
    });
});