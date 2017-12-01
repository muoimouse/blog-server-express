'use strict';

const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    let comment = sequelize.define('Comment', {
        user_id: { type: Sequelize.INTEGER },
        user_name: { type: Sequelize.STRING(250) },
        like: { type: Sequelize.STRING(250) },
        content: { type: Sequelize.TEXT }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'comments'
        });
    return {
        Comment: comment
    };
};