var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SessionsSchema   = new Schema({
	user				: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	token         		: { type: String },
	device 				: { type: String },
	updated_at			: { type: Date, default: Date.now },
	created_at			: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sessions', SessionsSchema);