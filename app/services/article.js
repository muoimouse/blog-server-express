const _ = require('underscore');

module.exports = (sequelize) => {
    let model = require('../models/articles')(sequelize).Article;
    return {
        add: (item, callback) => {
            model.create(item)
                .then((result) => {
                    return callback(null, _.clone(result.dataValues));
                })
                .catch((error) => {
                    return callback(error);
                });
        },
        update: (item, callback) => {
            model.update(item, { where: { id: item.id } })
                .then((result) => {
                    return callback(null, _.clone(result.dataValues));
                })
                .catch((error) => {
                    return callback(error);
                });
        },
        delete: (id, callback) => {
            model.destroy({ where: { id: id } })
                .then((result) => {
                    return callback(null, _.clone(result.dataValues));
                })
                .catch((error) => {
                    return callback(error);
                });
        },
        get: (id, callback) => {
            model.findOne({ where: { id: id } })
                .then((result) => {
                    return callback(null, _.clone(result.dataValues));
                })
                .catch((error) => {
                    return callback(error);
                });
        },
        getAll: (callback) => {
            model.findAll()
                .then((result) => {
                    return callback(_.clone(result.dataValues));
                })
                .catch((error) => {
                    return callback(error);
                });
        }
    };
};