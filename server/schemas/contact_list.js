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


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('ContactList', schema);
};