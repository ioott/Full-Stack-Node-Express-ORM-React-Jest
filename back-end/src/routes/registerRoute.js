const express = require('express');
const registerController = require('../controllers/registerController');
const validateToken = require('../middlewares/validateToken');

require('express-async-errors');

const router = express.Router();

router.post('/', registerController.create);

router.post('/admin', validateToken, registerController.adminCreate);

module.exports = router;