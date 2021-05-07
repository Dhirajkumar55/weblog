const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: String,
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});


module.exports = mongoose.model('Category', CategorySchema);