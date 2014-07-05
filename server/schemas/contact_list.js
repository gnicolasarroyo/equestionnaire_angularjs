'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose');


/**
 * Contact List Model Schema
 */
var schema = new mongoose.Schema({
	user: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	name: 			{ type: String, required: true },
	contacts: 		[{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
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

schema.path('contacts').validate(function(contacts) {
    return (typeof contacts === 'object'); 
}, 'Invalid type Contacts');

schema.path('contacts').validate(function(contacts) {
    return (contacts.length > 0 && contacts.length < 301);
}, 'Invalid length Contacts');


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('ContactList', schema);
};