'use strict';
const _ = require('lodash');
const errorCodes = {
    InvalidArticle: 'InvalidArticle',
    InvalidArticleId: 'InvalidArticleId'
};
module.exports = (sequelize) => {
    let Article = require('../models/articles')(sequelize).Article;
    return {
        save: (article, cb) => {
            if (!article) {
                let err = new Error(errorCodes.InvalidArticles);
                err.code = errorCodes.InvalidArticles;
                return cb (err);
            }
            Article.create(article)
                .then((result) => {
                    return cb(null, _.clone(result.dataValues));
                })
                .catch((err) => {
                    return cb(err);
                })
        },
        update: (article, cb) => {
            if (!article) {
                let result = {};
                return cb(null, result);
            }
            Article.findOne({ where: { id: article.id } })
                .then((result) => {
                    if (!result) {
                        return cb(null, false);
                    }
                    return cb(null, true);
                })
                .catch((err) => {
                    return cb(err);
                })
        },
        delete: (id, cb) => {
            if (!id) {
                let err = new Error(errorCodes.InvalidArticleId);
                return cb(err);
            }
            Article.destroy({ where: { id: id } })
                .then((result) => {
                    if (!result) {
                        let err = new Error(errorCodes.InvalidArticleId);
                        return cb(err);
                    }
                    return cb(null, true);
                })
                .catch((err) => {
                    return cb(err);
                })
        }
    }
};