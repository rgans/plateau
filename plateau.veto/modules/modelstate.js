'use strict';

function ModelState() {
    this._modelFault = new Array();
};

ModelState.prototype.isValid = function() {
    return this._modelFault.length <= 0;
};

ModelState.prototype.addModelFault = function(field, type, message, data) {
    this._modelFault.push({ field: field, type: type, message: message, data: data });
};

ModelState.prototype.fault = function() {
    return this._modelFault;
};

module.exports = ModelState;