'use strict';

var CONFIG = require('../../config');
var tokenProvider = require('../../security/accesstokenprovider');
var statusCode = require('../http/httpstatuscode');
var resultError = require('../../resources/resulterror');
var User = require('../../security/user');
var Identity = require('../../security/identity');
//var userManager = require('./usermanager');

var handler = function() {
    this.context = {
        request: null,
        response: null
    };
};

handler.prototype.bind = function(server) {
    server.pre(this._onPreRequest());
};

handler.prototype._onPreRequest = function() {
    var $t = this;
    function __onPreRequest(req, res, next) {
        
        $t.context.request = req;
        $t.context.response = res;
        
        $t._requestToken();
        var token = $t.context.request.accessToken;
        if(!token) {
            $t._applyUser();
            return next();
        }
        console.log('authenticate with token: ', token);
        
        var ticket = tokenProvider.deserializeTicket(token);
        if(!ticket)
            res.send(statusCode.UNAUTHORIZED, { error: resultError.INVALID_TOKEN });
        
        var currentUtc = new Date();
        if(ticket.properties.expiresutc < currentUtc)
            res.send(statusCode.UNAUTHORIZED, { error: resultError.EXPIRED_TOKEN });
        
        if($t._validateIdentity(ticket))
            $t.context.accessTicket = ticket;
        
        console.log('user authentication succeeded');
        
        $t._applyUser();
        
        return next();
    }
    
    console.log('authentication handler binded');
    
    return(__onPreRequest);
};

handler.prototype._requestToken = function() {
    var token = this.context.request.headers[CONFIG.AUTHENTICATION.ACCESS_TOKEN_HEADER];
    this.context.request.accessToken = token;
};

handler.prototype._applyChallenge = function() {
    this.context.request.headers.set(CONFIG.AUTHENTICATION.AUTH_CHALLENGE_HEADER, CONFIG.AUTHENTICATION.AUTH_TYPE);
};

handler.prototype._applyUser = function() {
    var ticket = this.context.accessTicket;
    var identity = ticket ? ticket.identity : new Identity({ name: 'Anonymous' });
    var user = new User(identity, new Array());
    this.context.request.user = user;
};

handler.prototype._validateIdentity = function(ticket) {
    /*
    var validateInterval = 1;
    var currentUtc = new Date();
    var issuedUtc = ticket.properties.issuedUtc;
    var validate = (issuedUtc === null);
    if (issuedUtc !== null) {
        var timeElapsed = 2; //currentUtc.Subtract(issuedUtc.Value);
        validate = timeElapsed > validateInterval;
    }
    
    if(validate) {
        var identity = ticket.identity;
        var userId = identity.userId;
        var user = userManager.find(userId);
    }
    */
   
   return true;
};

module.exports = new handler();