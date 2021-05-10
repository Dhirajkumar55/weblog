const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blog');
const blogs = require('../controllers/blog');
const { isLoggedIn, validateBlog, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(blogs.home))
    .post(isLoggedIn, upload.single('image'), validateBlog, catchAsync(blogs.createNewBlog))

router.get('/new', isLoggedIn, blogs.renderNewForm)

router.route('/:id')
    .get(catchAsync(blogs.showBlog))
    .put(isLoggedIn, isAuthor, validateBlog, catchAsync(blogs.updateBlog))
    .delete(isLoggedIn, isAuthor, catchAsync(blogs.deleteBlog));

router.post("/:id/upvotes", isLoggedIn, catchAsync(blogs.upvotes));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(blogs.renderEditForm))

module.exports = router;