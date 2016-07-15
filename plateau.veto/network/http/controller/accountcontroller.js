'use strict';

var util = require('util');
var accountService = require(__path.data.plateau.service.accountservice);

var account = function () {
};

account.find = function(req, res, next) {
    accountService.find(req.queryOptions, function(result) {
        res.send(result);
    });
};

module.exports = account;