'use strict';

var statusCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    NO_CONTENT: 204,
    NOT_MODIFIED: 304,
    UNAUTHORIZED: 401,
    METHOD_NOT_ALLOWED: 405,
    GONE: 410,
    VERSION_NOT_SUPPORTED: 505,
};

module.exports = statusCode;