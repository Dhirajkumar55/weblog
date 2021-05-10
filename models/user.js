const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    blogsWritten: Number,
    comments: Number,
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    readLater: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    profilepic: {
        url: 'String',
        filename: 'String'
    },
    // followers: Number,
    // upvotes: Number,
    // following: Number,
    // followinglist: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);