const express = require('express');
const sellerController = require('../controllers/sellerController');
require('express-async-errors');

const router = express.Router();

router.get('/', sellerController.getAllSellers);

module.exports = router;