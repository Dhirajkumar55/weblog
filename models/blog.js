const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');
const User = require('./user');

const BlogSchema = new Schema({
    title: String,
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    image: {
        url: 'String',
        filename: 'String'
    },
    duration: Number,
    body: {},
    // upvote: Number,
    // downvote: Number,
    votes: Number,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    categories: [{
        type: String
    }]
});

BlogSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Blog', BlogSchema);