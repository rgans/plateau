'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var contactSchema = new schema({
    type: {type: String, required: true, enum: ['email', 'homephone', 'workphone', 'cellphone', 'whatsapp']},
    value: {type: String, required: true}
});

var entity = { collection_name: 'contact' };

entity.model = mongoose.model(entity.collection_name, contactSchema);

module.exports = entity;