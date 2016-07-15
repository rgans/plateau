'use strict';

var ModelState = require(__path.data.plateau.service.modelstate);
var ActionResult = require(__path.data.plateau.service.serviceresult);
var statusCode = require(__path.network.http.httpstatuscode);
var resultError = require(__path.resources.resulterror);

function ApiController() {
    this.modelState = new ModelState();
};

ApiController.prototype.validate = function(model) {
    var error = model.validateSync();

    if(error && error.errors) {
        var errors = Object.keys(error.errors).map(function (key) {return error.errors[key];});
        console.log(errors);
        for(var i = 0; i < errors.length; i++) {
            this.modelState.addModelFault(errors[i].path, errors[i].kind, errors[i].message, null);
        }
    }
};

ApiController.prototype.validationFaultResult = function(content) {
    var result = this.result(statusCode.BAD_REQUEST, content);
    return this.result(statusCode.BAD_REQUEST, content);
};

ApiController.prototype.errorResult = function(content) {
    return this.result(statusCode.INTERNAL_SERVER_ERROR, content);
};

ApiController.prototype.okResult = function(content) {
    return this.result(statusCode.OK, content);
};

ApiController.prototype.result = function(status_code, content) {
    var result = new ActionResult(content);
    result.setStatusCode(status_code);
    
    var modelState = this.modelState;
    var modelFault = modelState.fault();
    console.log('action executed with result: ', result);

    if(!modelState.isValid()) {
        result.error = resultError.MODEL_VALIDATION;
        result.fault = {};
        for(var i = 0; i < modelFault.length; i++) {
            var fault = modelFault[i];
            var key = result.fault[fault.field];
            if(!key) key = new Array();

            key.push(fault);

            result.fault[fault.field] = key;
        }
    }

    this.response.send(result.statusCode, result);
    
    return result;
};

module.exports = ApiController;