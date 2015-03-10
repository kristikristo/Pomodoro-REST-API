var Orders     = require('../models/orders');
var Feedback     = require('../models/feedback');
var Products     = require('../models/products');
var errors = require('../../errors');
var Cart     = require('../models/cart');

// POST /orders
exports.add = function(req, res, next) {
	var order 					= new Orders();
	order.user 					= req.user._id;
	order.cart 					= req.body.cart_id;	
	order.tracking_code			= generateTrackingCode();
	order.status 				= 0;

	order.save(function(err, result) {
		if(err)
			return next(new errors.CustomError(res, 1010, err));

		Orders.findOne(result).populate('cart').exec(function (err, item) {
			if (err)
				return next(new errors.CustomError(res, 1010, err));
			
			if (!item.cart)
				return next(new errors.CustomError(res, 1021));

			if (item.cart.status != 0)
				return next(new errors.CustomError(res, 1030));

			order.coupon_code = item.cart.coupon_code;

			order.save(function(err, r) {
				if (err)
					return next(new errors.CustomError(res, 1010, err));

				Cart.findOne({ _id: order.cart }, function (err, doc){
				  doc.status = 1;
				  doc.save(function(err){
				  	res.json(201, {
							'message' : "Order created",
							'status' : 0,
							'order' : item
						});
				  });
				});
			});
		});
	});

};

// GET /orders/check/:tracking_code
exports.checkStatus = function(req, res, next) {	
	Orders.find({ tracking_code :req.params.tracking_code}, 'tracking_code status', function(err, result) {
		if (result.length == 0)
			return next(new errors.CustomError(res, 1009));
		switch(result[0].status) {
			case 0:
			res.json({ status: 0, messsage: 'We received your order, and we will process it soon'});
			break;
			case 1:
			res.json({ status: 1, messsage: 'We are now processing your order.'});
			break
			case 2:
			res.json({ status: 2, messsage: 'Your pizza is on its way'});
			break;
			default:
			res.json({ status: 3, messsage: 'Order does not exist or is not active'});
		}
	});
};

// GET /orders/list
exports.list = function(req, res, next) {
	Orders.find({ user : req.user._id }).populate('cart').exec(function (err, result) {
		if (result.length == 0)
			return next(new errors.CustomError(res, 1012));
		res.json(result);
	});
};

// GET /orders/list
exports.detail = function(req, res, next) {	
	Orders.find({ _id : req.user._id }, function(err, result) {
		if (err)
			return next(new errors.CustomError(res, 1010, err));
		if (result.length == 0)
			return next(new errors.CustomError(res, 1012));
		res.json(result);
	});
};

// POST /orders/:order_id/feedback
// Requires AUTH
exports.orderfeedback = function(req, res, next) {	
	var feedback 				= new Feedback();
	feedback.user_id 			= req.user._id;
	feedback.order_id 			= req.params.order_id;
	feedback.status 			= 0;
	feedback.message 			= req.body.feedback;

	feedback.save(function(err) {
		if(err)
			return next(new errors.CustomError(res, 1010, err));
		res.json(201, {
			message : "Thank you, feedback is received",
			status : 1
		});
	});
};

function calculateTotalPrice(p_id, size)
{
	Products.findById(p_id, function(err, result) {
		return result.sizes[size];
	});
}

function calculateFinalPrice(p_id, size)
{
	Products.findById(p_id, function(err, result) {
		return result.sizes.size;
	});
}

// Algorithm for generating random tracking code number
function generateTrackingCode()
{
	return Math.floor((Math.random() * 1000000) + 1);
}