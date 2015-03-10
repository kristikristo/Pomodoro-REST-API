var Coupons     = require('../models/coupons');
var Carts     = require('../models/cart');
var errors = require('../../errors');

exports.applyCoupon = function(req, res, next) {
	var coupon 	= req.params.coupon;
	var cart 	= req.params.cart_id;

	var q = Coupons.findOne({ identifier : coupon }).where('status').equals(1);
	q.execFind(function(err, result) {
		if (!result)
			return next(new errors.CustomError(res, 1022));

		if (result.length == 0)
			return next(new errors.CustomError(res, 1023));

		var result = result[0];
		var couponPercentageDiscount = parseInt(result.percentage);
		Carts.findOne({  _id : cart }).exec(function (err, theCart) {
			if (err) return handleError(err);

			if (!theCart)
				return next(new errors.CustomError(res, 1024));

			theCart.final_price = parseInt(theCart.total_price * (1 - couponPercentageDiscount/100));
			theCart.coupon_code = result.identifier;
			theCart.save(function(err, c) {
				if (err)
					return next(new errors.CustomError(res, 1025));
				res.json(201, {
					message : "Price updated",
					status : true,
					final_price : c.final_price
				});
			});
		})
	});

};

exports.removeCoupon = function(req, res, next) {
	var coupon 	= req.params.coupon;
	var cart 	= req.params.cart_id;

	var q = Coupons.findOne({ identifier : coupon }).where('status').equals(1);
	q.execFind(function(err, result) {
		if (!result)
			return next(new errors.CustomError(res, 1022));

		if (result.length == 0)
			return next(new errors.CustomError(res, 1023));

		var result = result[0];
		var couponPercentageDiscount = parseInt(result.percentage);
		Carts.findOne({  _id : cart }).exec(function (err, theCart) {
			if (err) return handleError(err);

			if (!theCart)
				return next(new errors.CustomError(res, 1024));

			theCart.final_price = theCart.total_price;
			theCart.coupon_code = undefined;

			theCart.save(function(err, c) {
				if (err)
					return next(new errors.CustomError(res, 1025));
				res.json(201, {
					message : "Coupon removed",
					status : true
				});
			});
		})
	});

};

exports.addCoupon = function(req, res, next) {
	var coupon					= new Coupons();
	coupon.identifier			= '50OFF';
	coupon.description 			= '50 perqind ulje';
	coupon.percentage 			= 50;
	coupon.status 				= 1;
	coupon.save(function(err) {
		if(err)
			return next(new errors.CustomError(res, 1010, err));
		res.json(201, {
			message : "Successfully added"
		});
	});
};