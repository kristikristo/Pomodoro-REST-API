var util = require('util');

var errorMessage = {
  '1000' : 'Endpoint does not exists',
  '1006' : 'No products on our database',
  '1007' : 'There is no product in our database with the requested ID',
  '1008' : 'There are no products with the requested type',
  '1010' : 'Custom error',
  '1009' : 'Tracking code is not valid',
  '1011' : 'Pizza Size does not exist',
  '1012' : 'No order for the user with that id',
  '1013' : 'Ingredient is not available',
  '1014' : 'User does not exist',
  '1015' : 'Password does not match',
  '1016' : 'There is no user with that token',
  '1017' : 'Token could not be removed, error on saving the new user without token',
  '1018' : 'Your cart is empty',
  '1019' : 'Cart could not be created successfully',
  '1020' : 'You cannot create a new cart, while you already have one',
  '1021' : 'Cart does not exists',
  '1022' : 'Error in retrieving coupon information',
  '1023' : 'Coupon is not active or does not exists',
  '1024' : 'The cart you requested does not exist',
  '1025' : 'Could not update the price of the cart',
  '1026' : 'You dont have a cart, so create a new one',
  '1027' : 'No product to update',
  '1028' : 'Invalid JSON request, check attributes',
  '1029' : 'Error updating the cart',
  '1030' : 'Cart is already ordered',
  '1031' : 'The cart does not exist, you have to create a new cart'
};

function CustomError(res, code, msg) {
  var errorMsg = errorMessage[code];
  if (msg) {
    errorMsg = msg;
  };
  res.json(401, {
    'error' : code,
    'message' : errorMsg
  });
};

module.exports = {
  CustomError: CustomError
};
