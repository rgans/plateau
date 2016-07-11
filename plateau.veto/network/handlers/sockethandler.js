'use strict';

var extend = require('util')._extend;
var path = require('path');
var resultError = require('../../resources/resulterror');
var statusCode = require('../http/httpstatuscode');
var io = require('socket.io');

var handler = function() {
};

handler.prototype.bind = function(server) {
    this.socket = io(server);
    
    $it = this;
    this.socket.on('login', function (data) {
        $it._onLogin(data);
    });
};

handler.prototype._onLogin = function(data) {
};

module.exports = new handler();