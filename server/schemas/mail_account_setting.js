'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose');


/**
 * Mail Account Setting Model Schema
 */
var schema = new mongoose.Schema({
	user: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	name: 			{ type: String, required: true },
	host: 			{ type: String, required: true },
	port: 			{ type: Number, required: true },
	username: 		{ type: String, required: true },
	password: 		{ type: String, required: true },
	created_at: 	{ type: Date, default: Date.now() },
	updated_at: 	{ type: Date, default: Date.now() }
});


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('MailAccountSetting', schema);
};