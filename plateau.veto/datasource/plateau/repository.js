'use strict';

var CONFIG = require('../../config');

var mongoose = require("mongoose");

// Create the database connection 
mongoose.connect(CONFIG.DATASOURCE.PLATEAU.CNNSTRING, CONFIG.DATASOURCE.PLATEAU.OPTIONS);

// CONNECTION EVENTS 
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + CONFIG.DATASOURCE.PLATEAU.CNNSTRING);
});

mongoose.connection.on('error', function (err) {
    console.error.bind(console, 'MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var contactSchema = require('./contactentity');
var addressSchema = require('./addressentity');
var roleSchema = require('./roleentity');
var userSchema = require('./userentity');

module.exports = {
    Contact: mongoose.model(contactSchema.collection_name),
    Address: mongoose.model(addressSchema.collection_name),
    Role: mongoose.model(roleSchema.collection_name),
    User: mongoose.model(userSchema.collection_name),
};