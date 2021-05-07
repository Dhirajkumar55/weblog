const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/category');
const categories = require('../controllers/category');

router.get('/', categories.index);

router.get('/:cat', catchAsync(categories.listAll));

module.exports = router;