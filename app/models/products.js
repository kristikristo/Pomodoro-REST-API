var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductsSchema   = new Schema({
	type				: { type: String, required: true },
	name 				: { type: String, required: true },
	description 		: { type: String, required: true },
	sizes				: {
		medium 	: { type: Number, required: true},
		large	: { type: Number, required: true}
	},
	ingredients			: { type: String },
	photo				: { type: String },
	updated_at		: { type: Date, default: Date.now },
	created_at		: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products', ProductsSchema);