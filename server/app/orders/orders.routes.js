const router = require('express').Router();
const ordersController = require('./orders.controller');

router.post('/', ordersController.placeOrder)

module.exports = router;