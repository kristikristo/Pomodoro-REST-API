var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');

passport.use(new BearerStrategy({
  },
  function(token, done) {
    process.nextTick(function () {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('bearer', { session : false });