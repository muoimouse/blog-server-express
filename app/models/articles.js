'use strict';

const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    let article = sequelize.define('Article', {
        title: { type: Sequelize.STRING(250) },
        tag: { type: Sequelize.STRING(250) },
        view: { type: Sequelize.INTEGER },
        user_id: { type: Sequelize.INTEGER },
        user_name: { type: Sequelize.STRING(250) },
        image: { type: Sequelize.TEXT },
        content: { type: Sequelize.TEXT }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'articles'
        });
    return {
        Article: article
    };
};