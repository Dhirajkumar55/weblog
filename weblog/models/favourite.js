const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

module.exports = mongoose.model('Favourite', FavouriteSchema);