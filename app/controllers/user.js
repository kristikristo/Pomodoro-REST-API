var User = require('../models/user');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');
var errors = require('../../errors');

// POST /api/auth/register
exports.register = function(req, res) {
  generatedToken = uuid.v1();

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    phone : req.body.phone,
    address : req.body.address,
    token : generatedToken
  });

  user.save(function(err) {
    if (err)
      res.send(err);
    res.json(201, { 
      message     : 'User added',
      token       : generatedToken
      });
  });
};

// POST /api/auth/login
exports.login = function(req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) { return next(new errors.CustomError(res, 1007)); }

      if (!user) { return next(new errors.CustomError(res, 1014)); }

      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (err) { return next(new errors.CustomError(res, 1007)); }

        if (!isMatch) { return next(new errors.CustomError(res, 1015)); }

        generateToken = uuid.v1();
        user.token = generateToken;

        user.save(function(err) {
          if(err)
            return next(new errors.CustomError(res, 1010, err));
          res.json({
            'user' : user,
            'token' : generateToken
          });
        });
      });
    });
};

// GET /api/auth/profile/me
exports.me = function(req, res) {
  res.json(req.user);
};

// POST /api/auth/logout
exports.logout = function(req, res, next) {
  User.findOne({ token : req.user.token}, function(err, user) {
    if (err)
      return next(new errors.CustomError(res, 1007));
    user.token = '';
    user.save(function(err){
      if (err)
        return next(new errors.CustomError(res, 1017));
      res.json(200, {
        status : 1,
        message : 'User logged out'
      })
    });
  });
};
