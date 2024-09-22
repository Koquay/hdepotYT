const indexRoutes = require('../index/index.routes');
const productRoutes = require('../product/product.routes');
const userRoutes = require('../user/user.routes');
const ordersRoutes = require('../orders/orders.routes');

module.exports = (app) => {
    app.use('/api/product', productRoutes)
    app.use('/api/user', userRoutes)
    app.use('/api/orders', ordersRoutes)
    app.use('/*', indexRoutes);
}