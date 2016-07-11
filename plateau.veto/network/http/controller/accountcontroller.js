'use strict';

var util = require('util');
var accountManager = require('../../../data/plateau/service/accountservice');

var account = function () {
};

account.find = function(req, res, next) {
    accountManager.find(req.queryOptions, function(result) {
        res.send(result);
    });
};

module.exports = account;