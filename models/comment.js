const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const CommentSchema = new Schema({
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);