const ordersService = require('./orders.service');

exports.placeOrder = (req, res) => {
    ordersService.placeOrder(req, res);
}