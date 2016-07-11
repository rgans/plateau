'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
//var permissionSchema = require('./permission_entity');
//var roleSchema = require('./roleentity');
var address = require('./addressentity');
var contact = require('./contactentity');

var userSchema = new schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: String, required: true, enum:['Active', 'Inactive']},
    
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nickName: {type: String},
    birthDate: {type: Date},
    address: address.schema,
    contact: [contact.schema],
    //permission: [{type: mongoose.Schema.ObjectId, ref: permissionSchema.collectionName}],
    //role: [{type: mongoose.Schema.ObjectId, ref: roleSchema.collectionName}]
}, { strict: true });

var entity = { collectionName: 'user' };

entity.model = mongoose.model(entity.collectionName, userSchema);

module.exports = entity;