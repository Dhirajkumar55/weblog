const express = require('express');
const router = express.Router({ mergeParams: true });
const Readlater = require('../models/readlater');
const readlater = require('../controllers/readlater');
const catchAsync = require('../utils/catchAsync');

router.get('/readlater', catchAsync(readlater.add))