var express    = require('express');
var app        = express();
var router = express.Router();
var passport = require('passport');
var util = require('util');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config = require('./config')

var userController = require('./app/controllers/user');
var productsController = require('./app/controllers/products');
var ordersController = require('./app/controllers/orders');
var othersController = require('./app/controllers/others');
var cartController = require('./app/controllers/cart');
var couponsController = require('./app/controllers/coupons');
var auth = require('./app/controllers/auth');

mongoose.connect(config.db_dev , function(err, res) {
    if (err)
        console.log('Could not connect to mongo server.\n'+err);
    else
        console.log('Connected to mongo server');
});

app.use(bodyParser());
app.use(bodyParser.json());
app.use(passport.initialize());

// router.use(function(req, res, next) {
//     // SHOULD DO:
//     // 1- Check the time for the /orders endpoint
//     // 2- Algorithm to check the 30 minutes flux and determine accepting/declining the order
//     // if (req.originalUrl == '/api/orders')
//     //     res.json({ status: 'closed' });
//     // console.log(req.originalUrl);
//     next();
// });

router.route('/products').get(productsController.index);
router.route('/products/:product_id').get(productsController.info);
router.route('/products/type/:product_type').get(productsController.type);
router.route('/products/type/:product_type/limit/:limit_number').get(productsController.limit);
router.route('/products/price/:product_id/:pizza_size').get(productsController.priceforsize);
router.route('/internal/products').post(productsController.add);

router.route('/orders').post(auth.isAuthenticated, ordersController.add);
router.route('/orders/list').get(auth.isAuthenticated, ordersController.list);
router.route('/orders/list/:order_id').get(auth.isAuthenticated, ordersController.detail);
router.route('/orders/check/:tracking_code').get(ordersController.checkStatus);
router.route('/orders/:order_id/feedback').post(auth.isAuthenticated, ordersController.orderfeedback);

router.route('/cart').get(auth.isAuthenticated, cartController.view);
router.route('/cart').post(auth.isAuthenticated, cartController.cart);
router.route('/cart').put(auth.isAuthenticated, cartController.update);

router.route('/coupons/:coupon/:cart_id').post(couponsController.applyCoupon);
router.route('/coupons/:coupon/:cart_id').delete(couponsController.removeCoupon);
router.route('/coupons/new').post(couponsController.addCoupon);		// DELETE

router.route('/ingredients/price/:cat/:ingredient').get(othersController.ingredientsPrice);

router.route('/auth/register').post(userController.register);
router.route('/auth/login').post(userController.login);
router.route('/auth/logout').post(auth.isAuthenticated, userController.logout);
router.route('/auth/profile/me').get(auth.isAuthenticated, userController.me);

router.route('*').get(othersController.wrong);

app.use('/api', router);

app.listen(config.port);

console.log('Server is running at ' + config.port);