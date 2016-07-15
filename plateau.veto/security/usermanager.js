'use strict';

var extend = require('util')._extend;
var repository = require(__path.data.plateau.repository);
var User = repository.User;

var UserManager = function() {
    this.supportsUserSecurityStamp = true;
};

UserManager.prototype.find = function(data, callback) {
    var $this = this;
    var o = extend({ username: null, password: null }, data);

    this.findByName(o.username, function(err, result){
        if(!err && !$this.checkPassword(result, o.password))
            result = null;
        
        if(callback) callback(err, result);
    });
};

UserManager.prototype.findByName = function(username, callback) {
    User.find({ name: username }, function(err, result){
        if(callback) callback(err, result);
    });
};

UserManager.prototype.checkPassword = function(user, password) {
    return this.verifyHashedPassword(user.password, password);
};

UserManager.prototype.createIdentity = function(user) {
    return new User(user);
};

UserManager.prototype.create = function(data, callback) {
    var $this = this;
    var o = extend({ username: null, password: null }, data);
    var err = null, result = "";

    this.findByName(o.username, function(err, result){
        if(!result && err && callback) {
            err = {};
            callback(err, result);
        } else { 
            o.password = $this.hashPassword(o.password);
            o.status = 'Active';

            User.create(o, function(err, result){
                if(callback) callback(err, result);
            });
        }
    });
};

UserManager.prototype.hashPassword = function(password) {
    return password;
};

UserManager.prototype.verifyHashedPassword = function(hashedPassword, providedPassword) {
    var psw = this.hashPassword(providedPassword);
    return hashedPassword === psw;
};

module.exports = new UserManager();