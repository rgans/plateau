'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var roleSchema = new schema({
    code: {type: String, required: true},
    name: {type: String},
    description: {type: String}
});

var entity = { collection_name: 'role' };

entity.model = mongoose.model(entity.collection_name, roleSchema);

module.exports = entity;