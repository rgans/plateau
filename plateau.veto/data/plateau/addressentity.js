'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var addressSchema = new schema({
    location: {type: String, required: true},
    district: {type: String, required: true},
    province: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    postcode: {type: String, minlength: 8, maxlength: 8}
}, { strict: true, _id : false });

var entity = { collectionName: 'address' };

entity.schema = addressSchema;
entity.model = mongoose.model(entity.collectionName, addressSchema);

module.exports = entity;