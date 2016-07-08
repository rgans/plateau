'use strict';

var statusCode = require('../httpstatuscode');
var resultError = require('../../resources/resulterror');

var authorize = function(req, res, next) {
    console.log('user authenticated: ', req.user.identity.isAuthenticated);
  if (req.user && req.user.identity.isAuthenticated) {
    return next();
  } else {
    //res.statusCode = statusCode.UNAUTHORIZED;
    //res.send({ error: resultError.UNAUTHORIZED });
    return next();
  }
};

module.exports = authorize;