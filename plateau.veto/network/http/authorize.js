'use strict';

var statusCode = require(__path.network.http.httpstatuscode);
var resultError = require(__path.resources.resulterror);

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