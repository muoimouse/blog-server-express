const _ = require('lodash');

const errorCodes = {
    InvalidComment: 'InvalidComment',
    UpdateCommentFail: 'UpdateCommentFail',
    InvalidInput: 'InvalidInput',
    InvalidCommentId: 'InvalidCommentId'
};


module.exports = (sequelize) => {
    let Comment = require('../models/comments')(sequelize).Comment;
    return {
        save: (comment, cb) => {
            Comment.create(comment)
                .then((result) => {
                    if (!result) {
                        let err = new Error(errorCodes.InvalidComment);
                        return cb(err);
                    }
                    return cb(null, _.clone(result.dataValues));
                })
                .catch((err) => {
                    return cb(err);
                })
        },
        update: (comment, cb) => {
            if (!comment) {
                let err = new Error(errorCodes.InvalidInput);
                return cb(err);
            }
            Comment.update(comment)
                .then((result) => {
                    if (!result) {
                        let err = new Error(errorCodes.UpdateCommentFail);
                        return cb(err);
                    }
                    return cb(null, { message: 'successful' });
                })
                .catch((err) => {
                    return cb(err);
                })
        },
        delete: (id, cb) => {
            if (!id) {
                let err = new Error()
            }
        }
    }
};