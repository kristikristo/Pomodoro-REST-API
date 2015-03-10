var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedbackSchema   = new Schema({
	user_id				: { type: String, required: true },
	order_id			: { type: String, required: true },
	status 				: { type: Number, required: true },
	message 			: { type: String, required: true },
	reply 				: { type: String},
	updated_at			: { type: Date, default: Date.now },
	created_at			: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);