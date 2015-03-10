var Cart     = require('../models/cart');
var errors = require('../../errors');

// GET /cart
exports.view = function(req, res, next) {
    Cart.findOne({  user_id : req.user._id })
        .populate('products._id user_', 'name description type ingredients sizes')
        .where('status').equals(0)
        .exec(function (err, result) {
            if (err) return handleError(err);

            if (!result)
                return next(new errors.CustomError(res, 1018));
            res.json(result);
        })
};

// PUT /cart
exports.update = function(req, res, next) {
    if (!req.body.products)
        return next(new errors.CustomError(res, 1028))
    var query = { user_id : req.user._id , status : 0};
    var update = {products : req.body.products};

    Cart.findOneAndUpdate(query, update,{upsert: false}).populate('products._id').exec(function(err, cart) {
        if(err)
            res.json({'issue' : 1});

        // if no cart, create a new one, or show error message
        if (!cart)
            return exports.cart(req, res, next);

        var totalPrice = 0;
        for (var i = 0; i < cart.products.length; i++) {
            var size  =  cart.products[i].size;
            var qty   =  cart.products[i].quantity;
            var price =  cart.products[i]._id.sizes[size];

            totalPrice += (price*qty);
        };
        cart.total_price = totalPrice;
        cart.final_price = totalPrice;

        cart.save(function(err, ress) {
            if (err)
                return next(new errors.CustomError(res, 1029));
            res.json(ress);
        });
    });
};

// POST /cart
exports.cart = function(req, res, next) {
    var q = Cart.find({ user_id : req.user._id }).where('status').equals(0);
    q.execFind(function(err, result) {
        if (result.length != 0)
            return next(new errors.CustomError(res, 1020));

        var cart 		= 	new Cart();
        cart.user_id 	= 	req.user._id;
        cart.status 	= 	0;

        for (var i = 0; i < req.body.products.length; i++) {
            cart.products.push(req.body.products[i]);
        };

        cart.save(function(err, cartt) {
            if(err)
                return next(new errors.CustomError(res, 1019, err));

            Cart.findOne(cartt, 'products coupon_code total_price final_price').populate('products._id').exec(function (err, item) {
                var totalPrice = 0;

                // Calculate total price
                for (var i = 0; i < item.products.length; i++) {
                    var size  =  item.products[i].size;
                    var qty   =  item.products[i].quantity;
                    var price =  item.products[i]._id.sizes[size];

                    totalPrice += (price*qty);
                };

                item.total_price = totalPrice;
                item.final_price = totalPrice;

                item.save(function(err, finalCart) {
                    res.json(201,finalCart);
                });
            });
        });
    });
};