'use strict';

var util = require('util');
var ApiController = require('../modules/apicontroller');
var repository = require('../datasource/plateau/repository');
var User = repository.User;

function Account() {
    Account.super_.apply(this, arguments);
};

Account.super_ = ApiController;

util.inherits(Account, ApiController);

Account.prototype.get = function() {
    var result = {};
    
    return this.okResult(result);
};

Account.prototype.getByKey = function(key) {
    var result = { key: key };
    
    return this.okResult(result);
};

Account.prototype.post = function(bm) {
    console.log(bm);
    var user = new User(bm);

    this.validate(user);

    if(!this.modelState.isValid())
        return this.validationFaultResult();

    var $t = this;
    user.save(function(error) {
        if(error)
            return this.errorResult(error);

        return $t.okResult(user);
    });
};

module.exports = Account;