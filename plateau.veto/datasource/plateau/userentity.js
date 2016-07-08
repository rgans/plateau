'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
//var permissionSchema = require('./permission_entity');
var roleSchema = require('./roleentity');

var userSchema = new schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: String, required: true, enum:['Active', 'Inactive']},
    activation_date: {type: Date},
    //permission: [{type: mongoose.Schema.ObjectId, ref: permissionSchema.collection_name}],
    role: [{type: mongoose.Schema.ObjectId, ref: roleSchema.collection_name}]
});

var entity = { collection_name: 'user' };

entity.model = mongoose.model(entity.collection_name, userSchema);

module.exports = entity;