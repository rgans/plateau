'use strict';

var extend = require('util')._extend;
var path = require('path');
var resultError = require('../resources/resulterror');
var statusCode = require('./httpstatuscode');
var authorize = require('./security/authorize');

var AccountController = require('../controllers/accountcontroller');

var handler = function() {
    this.routeTable = null;
    this.controllersDir = path.resolve(__dirname, '../controllers');
    
    this._loadRouteTable();
};

handler.prototype._loadRouteTable = function() {
    this.routeTable = {
        get: [
            { route: '/account', controller: AccountController, action: { handler: AccountController.prototype.get } },
            { route: '/account/:key', controller: AccountController, action: { handler: AccountController.prototype.getByKey } }
        ],
        post: [
            { route: '/account', controller: AccountController, action: { handler: AccountController.prototype.post } },
        ]
    };
};

handler.prototype.bind = function(server) {
    //server.use(this._controllerHandler());
    var $t = this;
    console.log('register routes');
    Object.keys(this.routeTable).forEach(function(method) {
        var routes = $t.routeTable[method];
        if(routes) {
            routes.forEach(function(routeData) {
                if(routeData.action) {
                    var route = routeData.route;
                    console.log(method, ' ',route);
                    server[method](route, authorize, function(req, res, next) {
                        req.controllerContext = { controller: new routeData.controller() };
                        req.controllerContext.controller.request = req;
                        req.controllerContext.controller.response = res;
                        req.actionContext = routeData.action;

                        return $t._requestHandler(req, res, next);
                    });
                }
            });
        }
    });

    //server.get('/:controller?/:action?/:key?', authorize, this._requestHandler());
    //server.post('/:controller?/:action?', authorize, this._requestHandler());
    //server.put('/:controller?/:action?/:key?', authorize, this._requestHandler());
    //server.patch('/:controller?/:action?/:key?', authorize, this._requestHandler());
    //server.del('/:controller?/:action?/:key?', authorize, this._requestHandler());
    //server.opts('/:controller?/:action?/:key?', authorize, this._requestHandler());
    //server.head('/:controller?/:action?/:key?', authorize, this._requestHandler());
    
    /*
    server.on('after', function(req, res, next) {
      console.log('Tata...');
      return next();
    });
    */
};

handler.prototype._requestHandler = function(req, res, next) {
    var controller = req.controllerContext.controller;
    var actionContext = req.actionContext;
    var action = null;
    if(!actionContext || !(action = actionContext.handler))
        res.send(statusCode.NOT_FOUND, { error: resultError.NOT_FOUND });

    var actionParam = {};
    req.body ? actionParam.bm = req.body : null;
    extend(actionParam, req.params);
    extend(actionParam, req.query);
    var args = Object.keys(actionParam).map(function (key) {return actionParam[key];});
    
    action.apply(controller, args);

    return next();
};

module.exports = new handler();