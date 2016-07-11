'use strict';

var extend = require('util')._extend;

var identity = function(data){
    this.identifier = null;

    extend(this, data);
    
    this.isAuthenticated = this.identifier !== null && this.identifier !== '' && this.identifier !== 'undefined';
};

module.exports = identity;