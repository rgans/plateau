'use strict';

var ModelState = require(__path.data.plateau.service.modelstate);
var ActionResult = require(__path.data.plateau.service.serviceresult);
var resultError = require(__path.resources.resulterror);

function DataManager() {
    this.modelState = new ModelState();
};

DataManager.prototype.validate = function(model) {
    var error = model.validateSync();

    if(error && error.errors) {
        var errors = Object.keys(error.errors).map(function (key) {return error.errors[key];});
        console.log(errors);
        for(var i = 0; i < errors.length; i++) {
            this.modelState.addModelFault(errors[i].path, errors[i].kind, errors[i].message, null);
        }
    }
};

DataManager.prototype.validationFaultResult = function(content) {
    var result = this.result(content);
    return this.result(content);
};

DataManager.prototype.errorResult = function(content, cb) {
    return this.result(content, cb);
};

DataManager.prototype.okResult = function(content, cb) {
    return this.result(content, cb);
};

DataManager.prototype.result = function(content, cb) {
    var result = new ActionResult(content);
    
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
    
    if(cb)
        cb.call(this, result);
    
    return result;
};

module.exports = DataManager;