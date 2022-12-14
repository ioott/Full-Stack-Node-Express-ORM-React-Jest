const express = require('express');
const usersController = require('../controllers/usersController');
const validateToken = require('../middlewares/validateToken');
require('express-async-errors');

const router = express.Router();

router.get('/', validateToken, usersController.getAllUsers);

router.delete('/:id', validateToken, usersController.deleteUser);

module.exports = router;