'use strict';

var Identity = require(__path.security.identity);

var user = function(identity, roles) {
    this.identity = identity;
    this.roles = roles;
};

user.prototype.isInRole = function(role) {
    return true;
};

module.exports = user;