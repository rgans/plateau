'use strict';

var restify = require('restify');
var routeHandler = require('../network/handlers/routehandler');
var errorHandler = require('../network/handlers/errorhandler');
var logHandler = require('../network/handlers/loghandler');
var authHandler = require('../network/handlers/authenticationhandler');

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

server.use(restify.gzipResponse());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.jsonp());
server.use(restify.dateParser());

authHandler.bind(server);
routeHandler.bind(server);
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

module.globals.path = {
    security: {
        user : __dirname + '../security/user'
    }
};

var asd = require(module.path.security.user);
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});