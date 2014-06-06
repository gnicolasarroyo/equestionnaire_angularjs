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


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Contact', schema);
};