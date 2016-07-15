'use strict';

var extend = require('util')._extend;
var Identity = require(__path.security.identity);

var ticket = function(identity, properties) {
    this.identity = identity;
    this.properties = {
        allowRefresh: true,
        expiresUtc: null,
        isPersistent: false,
        issuedUtc: null,
        redirectUri: null
    };
    
    if(properties)
        extend(this.properties, properties);
};

module.exports = ticket;