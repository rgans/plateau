'use strict';

var util = require('util');
var extend = require('util')._extend;
var DataService = require('./dataservice');
var repository = require('../repository');
var User = repository.User;

function Account() {
    Account.super_.apply(this, arguments);
};

Account.super_ = DataService;

util.inherits(Account, DataService);

Account.prototype.find = function(options, cb) {
    if(typeof options === 'function') {
        cb = options;
        options = {};
    }
    
    var $it = this;
    var qo = {};
    extend(qo, options);

    User.find(qo.filter, function(error, users) {
      if (error)
          return this.errorResult(error, cb);

        return $it.okResult(users, cb);
    })
    .skip(qo.skip)
    .limit(qo.top)
    .sort(qo.orderBy)
    .select(qo.select);
};

Account.prototype.findByKey = function(key) {
    var $it = this;

    User.findOne(key, function (error, user) {
      if (error)
          return this.errorResult(error);

        return $it.okResult(user);
    });
};

Account.prototype.insert = function(bm) {
    var user = new User(bm);

    this.validate(user);

    if(!this.modelState.isValid())
        return this.validationFaultResult();

    var $it = this;
    user.save(function(error) {
        if(error)
            return this.errorResult(error);

        return $it.okResult(user);
    });
};

Account.prototype.remove = function(key) {
    var $it = this;

    User.findOne(key, function (error, user) {
      if (error)
          return this.errorResult(error);

        return $it.okResult(user);
    });
};

module.exports = new Account();