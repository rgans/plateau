'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var contactSchema = new schema({
    type: {type: String, required: true, enum: ['email', 'homephone', 'workphone', 'cellphone', 'whatsapp']},
    value: {type: String, required: true}
}, { strict: true, _id : false });

var entity = { collectionName: 'contact' };

entity.schema = contactSchema;
entity.model = mongoose.model(entity.collectionName, contactSchema);

module.exports = entity;