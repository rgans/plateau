'use strict';

var CONFIG = require('../../config');
var stream = require('stream');
var crypto = require('crypto');

var algorithm = 'aes-256-gcm';
var masterkey = CONFIG.SECURITY.DATA_PROTECTION_SECRET;

var protector = function(name, purposes) {
    this.name = name;
    this.purposes = purposes;
};

protector.prototype.protect = function(userData) {
    try {
        var unprotectedData = JSON.stringify({
            userData: userData,
            protectorName: this.name,
            purposes: this.purposes
        });
        
        console.log('Protect >> ', unprotectedData);
        
        // random initialization vector
        var iv = crypto.randomBytes(12);

        // random salt
        var salt = crypto.randomBytes(64);

        // derive key: 32 byte key length - in assumption the masterkey is a cryptographic and NOT a password there is no need for
        // a large number of iterations. It may can replaced by HKDF
        var key = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, 'sha512');

        // AES 256 GCM Mode
        var cipher = crypto.createCipheriv(algorithm, key, iv);

        // encrypt the given text
        var encrypted = Buffer.concat([cipher.update(unprotectedData, 'utf8'), cipher.final()]);

        // extract the auth tag
        var tag = cipher.getAuthTag();

        // generate output
        var protectedData = Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
        console.log('Protected >> ', protectedData);

        return protectedData;

    }catch(e){
    }

    // error
    return null;
};

protector.prototype.unprotect = function(protectedData) {
    try {
        console.log('Unprotect >> ', protectedData);
        
        // base64 decoding
        var bData = new Buffer(protectedData, 'base64');

        // convert data to buffers
        var salt = bData.slice(0, 64);
        var iv = bData.slice(64, 76);
        var tag = bData.slice(76, 92);
        var text = bData.slice(92);

        // derive key using; 32 byte key length
        var key = crypto.pbkdf2Sync(masterkey, salt , 2145, 32, 'sha512');

        // AES 256 GCM Mode
        var decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.setAuthTag(tag);

        // encrypt the given text
        var decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
        
        var protectedData = JSON.parse(decrypted);

        console.log('Unprotected >> ', protectedData);

        if(protectedData.protectorName !== this.name || protectedData.purposes !== this.purposes)
            return null;

        return protectedData.userData;

    }catch(e){
    }

    // error
    return null;
};

module.exports = protector;