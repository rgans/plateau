'use strict';

var path = require('path');
var fs = require('fs');

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

global.__path = {
    config: path.join(__dirname, 'config'),
    data: {
        plateau: {
            repository: path.join(__dirname, 'data/plateau/repository'),
            contactentity: path.join(__dirname, 'data/plateau/contactentity'),
            addressentity: path.join(__dirname, 'data/plateau/addressentity'),
            roleentity: path.join(__dirname, 'data/plateau/roleentity'),
            userentity: path.join(__dirname, 'data/plateau/userentity'),
            service: {
                accountservice: path.join(__dirname, 'data/plateau/service/accountservice'),
                dataservice: path.join(__dirname, 'data/plateau/service/dataservice'),
                modelstate: path.join(__dirname, 'data/plateau/service/modelstate'),
                serviceresult: path.join(__dirname, 'data/plateau/service/serviceresult')
            }
        }
    },
    network: {
        queryoptions: path.join(__dirname, 'network/queryoptions'),
        handlers: {
            authenticationhandler: path.join(__dirname, 'network/handlers/authenticationhandler'),
            errorhandler: path.join(__dirname, 'network/handlers/errorhandler'),
            loghandler: path.join(__dirname, 'network/handlers/loghandler'),
            routehandler: path.join(__dirname, 'network/handlers/routehandler'),
            sockethandler: path.join(__dirname, 'network/handlers/sockethandler')
        },
        http: {
            authorize: path.join(__dirname, 'network/http/authorize'),
            httpstatuscode: path.join(__dirname, 'network/http/httpstatuscode'),
            controller: {
                accountcontroller: path.join(__dirname, 'network/http/controller/accountcontroller'),
                apicontroller: path.join(__dirname, 'network/http/controller/apicontroller')
            }
        }
    },
    resources: {
        resulterror: path.join(__dirname, 'resources/resulterror'),
        resultfault: path.join(__dirname, 'resources/resultfault')
    },
    security: {
        accesstokenprovider: path.join(__dirname, 'security/accesstokenprovider'),
        authenticationticket: path.join(__dirname, 'security/authenticationticket'),
        dataprotector: path.join(__dirname, 'security/dataprotector'),
        dataserializer: path.join(__dirname, 'security/dataserializer'),
        identity: path.join(__dirname, 'security/identity'),
        user: path.join(__dirname, 'security/user'),
        usermanager: path.join(__dirname, 'security/usermanager')
    }
};

var restify = require('restify');
var routeHandler = require(__path.network.handlers.routehandler);
var socketHandler = require(__path.network.handlers.sockethandler);
var errorHandler = require(__path.network.handlers.errorhandler);
var logHandler = require(__path.network.handlers.loghandler);
var authHandler = require(__path.network.handlers.authenticationhandler);

var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0',
    /*
    formatters: {
        'application/foo': function formatFoo(req, res, body, cb) {
            if (body instanceof Error)
                return body.stack;

            if (Buffer.isBuffer(body))
                return cb(null, body.toString('base64'));

            return cb(null, util.inspect(body));
        }
    }
    */
});

var socket = require('socket.io')(3000);

server.use(restify.gzipResponse());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.jsonp());
server.use(restify.dateParser());

authHandler.bind(server);
routeHandler.bind(server);
socketHandler.bind(socket);
errorHandler.bind(server);
logHandler.bind(server);

/*

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.CORS({
    origins: ['https://foo.com', 'http://bar.com', 'http://baz.com:8081'],   // defaults to ['*']
    credentials: true,                 // defaults to false
    headers: ['x-foo']                 // sets expose-headers
}));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true,
  overrides: {
    '192.168.1.1': {
      rate: 0,        // unlimited
      burst: 0
    }
  }
}));
server.use(restify.conditionalRequest());
server.use(function setETag(req, res, next) {
  res.header('ETag', 'myETag');
  res.header('Last-Modified', new Date());
});

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});

var PATH = '/hello/:name';
server.get({path: PATH, version: '1.1.3'}, sendV1);
server.get({path: PATH, version: '2.0.0'}, sendV2);

server.get('/hello/:name', function(req, res, next) {
  return next(new restify.InvalidArgumentError("I just don't like you"));
});
*/

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});