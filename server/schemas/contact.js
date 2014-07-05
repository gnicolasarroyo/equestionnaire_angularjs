'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose');


/**
 * Contact Model Schema
 */
var schema = new mongoose.Schema({
	user: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	name: 			{ type: String, required: true },
	email: 			{ type: String, required: true },
	created_at: 	{ type: Date, default: Date.now() },
	updated_at: 	{ type: Date, default: Date.now() }
});


/**
 * Validations
 */
schema.path('name').validate(function(name) {
    return (typeof name === 'string'); 
}, 'Invalid type Name');

schema.path('name').validate(function(name) {
    return (name.length > 4 && name.length < 36);
}, 'Invalid length Name');

schema.path('email').validate(function(email) {
    return (typeof email === 'string');
}, 'Invalid type Email');

schema.path('email').validate(function(email) {
    return (email.length > 4 && email.length < 46);
}, 'Invalid length Email');


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Contact', schema);
};