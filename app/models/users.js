'use strict';

const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    let user = sequelize.define('User', {
        email: { type: Sequelize.STRING(250), allowNull: false, unique: true },
        password: { type: Sequelize.STRING(16), allowNull: false },
        last_logged_in: { type: Sequelize.DATE, defaultValue: Date },
        status: { type: Sequelize.BOOLEAN, defaultValue: true },
        facebook_id: { type: Sequelize.STRING(250), defaultValue: null },
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