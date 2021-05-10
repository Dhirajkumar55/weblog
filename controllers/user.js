const User = require('../models/user');
var JSAlert = require("js-alert");
const Blog = require('../models/blog');
const mongoose = require("mongoose");

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        registeredUser.profilepic.url = 'https://res.cloudinary.com/bhima2001/image/upload/v1620477291/weBlog/rtuucjwvtmxxixnb3adv.png';
        registeredUser.profilepic.filename = 'weBlog/rtuucjwvtmxxixnb3adv';
        await registeredUser.save();
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", 'Welcome to weBlog!');
            res.redirect('/blogs');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}`);
    const redirectUrl = req.session.returnTo || '/blogs';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'logged out succesfully');
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
    res.render('users/dashboard', { user });
}

module.exports.profileloggedin = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/profilepage', { user });
}

module.exports.profilenotloggedin = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const blogs = await Blog.find({ 'author': id }).populate('author');
    if (blogs.length) {
        user.blogsWritten = blogs.length;
    } else {
        user.blogsWritten = 0;
    }
    res.render('users/profile', { user });
}

module.exports.blogsWritten = async(req, res) => {
    const { id } = req.params;
    const blogs = await Blog.find({ 'author': id }).populate('author');
    res.render('users/userblogs', { blogs });
}

module.exports.favouriteBlogs = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const blogs = await Blog.find({ '_id': { "$in": user.favourites } }).populate('author');
    res.render('users/userblogs', { blogs })
}

module.exports.favourites = async(req, res) => {
    const { blogid, userid } = req.params;
    const blog = await Blog.findById(blogid);
    const user = await User.findById(userid);
    const checker = await User.find({ 'favourites': { "$in": [mongoose.Types.ObjectId(blog._id)] }, '_id': userid });
    if (!checker || checker.length === 0) { user.favourites.push(blog); }
    await user.save();
    res.redirect(`/blogs/${blogid}`);
}

module.exports.uploadProfilePic = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    user.profilepic.url = req.file.path;
    user.profilepic.filename = req.filename;
    await user.save();
    res.redirect(`/users/${id}/profile`);
}