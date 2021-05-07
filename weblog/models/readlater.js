const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadlaterSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    readlater: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

module.exports = mongoose.model('Readlater', ReadlaterSchema);