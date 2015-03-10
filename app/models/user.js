var mongoose     = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	email		    	: { type: String, required: true , index: { unique: true }},
	password		  : { type: String, required: true },
	first_name 		: { type: String, required: true },
	last_name 		: { type: String, required: true },
	phone		    	: { type: String, required: true },
	verified	  	: { type: Number, default: 0},
	address		  	: { type: String, required: true},
  token         : { type: String },
	updated_at		: { type: Date, default: Date.now },
	created_at		: { type: Date, default: Date.now }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);