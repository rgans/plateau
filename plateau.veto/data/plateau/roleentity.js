'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var roleSchema = new schema({
    code: {type: String, required: true},
    name: {type: String},
    description: {type: String}
}, { strict: true });

var entity = { collectionName: 'role' };

entity.model = mongoose.model(entity.collectionName, roleSchema);

module.exports = entity;