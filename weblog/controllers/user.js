const User = require('../models/user');
var JSAlert = require("js-alert");
const Blog = require('../models/blog');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            JSAlert.alert('Welcome to weBlog');
            res.redirect('/blogs');
        })
    } catch (e) {
        JSAlert.alert(e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    JSAlert.alert('Welcome back!');
    const redirectUrl = req.session.returnTo || '/blogs';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    JSAlert.alert('Good Bye');
    res.redirect('/blogs');
}

module.exports.dashboard = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const blogs = await Blog.find({ 'author': id }).populate('author');
    if (blogs.length) {
        user.blogsWritten = blogs.length;
    } else {
        user.blogsWritten = 0;
    }
    res.render('dashboard', { user });
}

module.exports.profile = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('profilepage', { user });
}

module.exports.blogsWritten = async(req, res) => {
    const { id } = req.params;
    const blogs = await Blog.find({ 'author': id }).populate('author');
    res.render('userblogs', { blogs });
}

module.exports.favourites = async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const userid = blog.author._id;
    const user = await User.findById(userid);
    const check = await User.find({ 'favourites': { "$in": [user] } });
    if (!check) {
        user.favourites.push(blog);
    }
    res.redirect(`blogs/${id}`);
}