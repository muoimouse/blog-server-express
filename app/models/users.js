'use strict';

const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    let user = sequelize.define('User', {
        email: { type: Sequelize.STRING(250), allowNull: true, unique: true },
        password: { type: Sequelize.STRING(16), allowNull: true },
        user_name: { type: Sequelize.STRING(250), allowNull: true },
        last_logged_in: { type: Sequelize.DATE, defaultValue: Date },
        status: { type: Sequelize.BOOLEAN, defaultValue: true },
        oauthId: { type: Sequelize.STRING(250), defaultValue: null },
        token: { type: Sequelize.STRING(250), allowNull: true }
    }, {
            timestamps: true, // create_at, update_at
            paranoid: true, // chuyen ham destroy thanh update, them ngay delete
            underscored: true,
            tableName: 'users'
        });
    return {
        User: user
    };
}; 