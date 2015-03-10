var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrdersSchema   = new Schema({
	user				: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	cart				: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
	tracking_code		: { type: String, required: true },
	status				: { type: Number, required: true },
	coupon_code			: { type: String},
	updated_at			: { type: Date, default: Date.now },
	created_at			: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', OrdersSchema);