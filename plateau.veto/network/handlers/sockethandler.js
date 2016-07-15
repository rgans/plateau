'use strict';

var extend = require('util')._extend;
var path = require('path');
var resultError = require(__path.resources.resulterror);

var handler = function() {
};

handler.prototype.bind = function(server) {
    this.socket = server;
    
    var $it = this;

    this.socket.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
    
    this.socket.on('connectt', function (data) {
        $it._onConnectt(data);
    });
    
    this.socket.on('login', function (data) {
        console.log(data);
        //$it._onLogin(data);
    });
    
    console.log('socket endpoints binded');
};

handler.prototype._onConnectt = function(data) {
    console.log(data);
};

handler.prototype._onLogin = function(data) {
    console.log(data);
};

module.exports = new handler();