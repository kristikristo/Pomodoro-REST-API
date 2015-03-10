var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CouponsSchema   = new Schema({
	identifier			: { type: String, required: true },
	description			: { type: String, required: true },
	percentage			: { type: Number },
	status				: { type: Number },
	start_date 			: { type: Date, required: true },
	end_date 			: { type: Date, required: true },
	updated_at			: { type: Date, default: Date.now },
	created_at			: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupons', CouponsSchema);
