var errors = require('../../errors');

var ingredients = {
	'meat' : {
		'x'		: 35,
		'y'		: 25
	},
	'premium_meat' : {
		'x'		: 24,
		'y'		: 20
	},
	'vegetables' : {
		'a'		: 10,
		'b'		: 20
	}
};

exports.ingredients = function(req, res, next) {
  res.json(ingredients);
};

// METHOD NEEDS TO BE EDITED
exports.ingredientsPrice = function(req, res, next) {
	if (ingredients[req.params.cat][req.params.ingredient]) {
		res.json({
			price : ingredients[req.params.cat][req.params.ingredient]
		});
	};
	res.json(new errors.CustomError(res, 1013));
	
};

exports.wrong = function(req, res) {
  res.json(new errors.CustomError(res, 1000));
};