const express = require('express');
const salesController = require('../controllers/salesController');
require('express-async-errors');

const router = express.Router();

router.get('/:id/orders/', salesController.getAllOrdersFromUser);

router.get('/products', salesController.getAll);

router.post('/checkout', salesController.addSale);

router.get('/orders/:id', salesController.findSaleById);

module.exports = router;