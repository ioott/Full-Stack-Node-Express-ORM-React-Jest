const express = require('express');
const customerController = require('../controllers/customerController');
require('express-async-errors');

const router = express.Router();

router.get('/:id/orders/', customerController.getAllOrdersFromUser);

router.get('/products', customerController.getAll);

router.post('/checkout', customerController.addSale);

router.get('/orders/:id', customerController.findSaleById);

module.exports = router;