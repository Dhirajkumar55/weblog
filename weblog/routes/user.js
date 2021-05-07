const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/user');
const { isLoggedIn } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

router.get('/users/:id/dashboard', isLoggedIn, users.dashboard)

router.get('/users/:id/profile', isLoggedIn, users.profile)

router.get('/users/:id/blogs', isLoggedIn, users.blogsWritten)

router.post('/user/:id/favourites', isLoggedIn, users.favourites)

module.exports = router;