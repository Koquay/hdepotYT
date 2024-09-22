const productsService = require('./product.service');

exports.getTopPicks = (req, res) => {
    console.log('ProductsController.getTopPicks')
    productsService.getTopPicks(req, res);
}

exports.getProducts = (req, res) => {
    console.log('ProductsController.getProducts')
    productsService.getProducts(req, res);
}