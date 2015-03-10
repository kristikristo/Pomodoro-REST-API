var Products     = require('../models/products');
var errors = require('../../errors');

// GET /products
exports.index = function(req, res, next) {
	Products.find({}, function(err, result) {
		if (result.length == 0)
			return next(new errors.CustomError(res, 1006));
		res.json(result);
	});
};

// GET /products/:product_id
exports.info = function(req, res, next) {
	Products.findById(req.params.product_id, function(err, result) {
  	if (!result)
  		return next(new errors.CustomError(res, 1007));
  	res.json(result);
  });
};

// GET /products/type/:product_type
exports.type = function(req, res, next) {
	Products.find({ type :req.params.product_type}, function(err, result) {
		if (result.length == 0)
			return next(new errors.CustomError(res, 1008));
		res.json(result);
	});
};

// GET /products/type/:product_type/limit/:limit_number
exports.limit = function(req, res, next) {
  	var q = Products.find({type : req.params.product_type}).limit(req.params.limit_number);
	q.execFind(function(err, result) {
		if (result.length == 0)
			return next(new errors.CustomError(res, 1008));
		res.json(result);
	});
};

// GET /products/price/:product_id/:size
exports.priceforsize = function(req, res, next) {
  	var q = Products.find({_id :req.params.product_id});
	q.execFind(function(err, result) {
		if (err)
			return next(new errors.CustomError(res, 1010, err));
		if (result.length == 0)
			return next(new errors.CustomError(res, 1008));

		var s = req.params.pizza_size;
		if (s != 'medium' && s != 'large')
			return next(new errors.CustomError(res, 1011));
		
		res.json({ price: result[0].sizes[s]});
	});
};

// POST /internal/products
// Requires AUTH
exports.add = function(req, res, next) {
 	var product					= new Products();
	product.type				= req.body.product_type.toLowerCase();
	product.name 				= req.body.name;
	product.description 		= req.body.description;
	product.sizes.medium		= req.body.medium_price;
	product.sizes.large			= req.body.large_price;
	product.ingredients			= req.body.ingredients;
	product.photo				= req.body.photo_url;

	product.save(function(err) {
		if(err)
			return next(new errors.CustomError(res, 1010, err));
		res.json(201, {
			message : "Successfully added"
		});
	});
};