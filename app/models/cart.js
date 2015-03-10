var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CartSchema   = new Schema({
	user_id				: { type: String, required: true },
	products 			: [{
		_id				: { type: Schema.Types.ObjectId, ref: 'Products' },
		size 			: { type: String },
		quantity		: { type: Number },
		note 			: { type: String },
		price			: { type: Number }
	}],
	status				: { type: Number, required: true },
	coupon_code			: { type: String},
	total_price			: { type: Number},
	final_price			: { type: Number},
	updated_at			: { type: Date, default: Date.now },
	created_at			: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
