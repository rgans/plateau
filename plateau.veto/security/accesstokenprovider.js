'use strict';

var DataSerializer = require(__path.security.dataserializer);
var DataProtector = require(__path.security.dataprotector);

var protectorName = __filename.slice(__dirname.length + 1, -3);
var protectorPurposes = 'AuthenticationToken';

var provider = function() {
    this.serializer = new DataSerializer();
    this.protector = new DataProtector(protectorName, protectorPurposes);
};

provider.prototype.deserializeTicket = function(token) {
    var unprotectedData = this.protector.unprotect(token);
    var ticket = this.serializer.deserialize(unprotectedData);
    
    return ticket;
};

provider.prototype.serializeTicket = function(ticket) {
    var unprotectedData = this.serializer.serialize(ticket);
    var protectedData = this.protector.protect(unprotectedData);
    
    return protectedData;
};

module.exports = new provider();