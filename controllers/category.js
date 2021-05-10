const Category = require('../models/category');
const Blog = require('../models/blog');

module.exports.index = (req, res) => {
    res.redirect('/#categories');
}

module.exports.listAll = async(req, res) => {
    await Category.find({ 'category': req.params.cat }, async function(err, docs) {
        if (err) {
            req.flash('error', 'Hola! An error occurred. Enjoy by playing our chess game.')
        }
        await Category.populate(docs, {
            path: 'blogs',
            model: 'Blog',
            populate: {
                path: 'author',
                model: 'User'
            }
        }, function(err, users) {
            res.render('blogs/categories', { user: users[0], category: req.params.cat });
        });
    });
}