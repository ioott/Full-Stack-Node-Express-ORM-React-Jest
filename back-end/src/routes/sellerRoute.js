const express = require('express');
const sellerController = require('../controllers/sellerController');
const salesController = require('../controllers/salesController');
require('express-async-errors');

const router = express.Router();

router.get('/', sellerController.getAllSellers);

router.get('/:id/orders/', salesController.getAllOrdersFromUser);

router.get('/products', salesController.getAll);

router.get('/orders/:id', salesController.findSaleById);

module.exports = router;