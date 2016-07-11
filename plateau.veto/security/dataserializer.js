'use strict';

var serializer = function() {
};

serializer.prototype.serialize = function(data) {
    console.log('Serialize >> ', data);
    return JSON.stringify(data);
};

serializer.prototype.deserialize = function(data) {
    console.log('Deserialize >> ', data);
    return JSON.parse(data);
};

module.exports = serializer;