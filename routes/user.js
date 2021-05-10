const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/user');
const { isLoggedIn } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

router.get('/users/:id/dashboard', isLoggedIn, users.dashboard)

router.get('/users/:id/profile', isLoggedIn, users.profileloggedin)

router.get('/users/:id/profilenl', users.profilenotloggedin)

router.get('/users/:id/blogs', isLoggedIn, users.blogsWritten)

router.get('/users/:id/favouriteBlogs', isLoggedIn, users.favouriteBlogs)

router.post('/user/:userid/favourites/:blogid', isLoggedIn, users.favourites)

router.post('/user/:id/profilepic', upload.single('profilepic'), isLoggedIn, users.uploadProfilePic)

module.exports = router;