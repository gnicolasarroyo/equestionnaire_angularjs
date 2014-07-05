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


/**
 * Validations
 */
schema.path('name').validate(function(name) {
    return (typeof name === 'string'); 
}, 'Invalid type Name');

schema.path('name').validate(function(name) {
    return (name.length > 4 && name.length < 36);
}, 'Invalid length Name');

schema.path('host').validate(function(host) {
    return (typeof host === 'string'); 
}, 'Invalid type Host');

schema.path('host').validate(function(host) {
    return (host.length > 4 && host.length < 46);
}, 'Invalid length Host');

schema.path('port').validate(function(port) {
    return (typeof port === 'number'); 
}, 'Invalid type Port');

schema.path('port').validate(function(port) {
    return (port > -1 && port < 65536);
}, 'Invalid length Port');

schema.path('username').validate(function(username) {
    return (typeof username === 'string'); 
}, 'Invalid type User name');

schema.path('username').validate(function(username) {
    return (username.length > 4 && username.length < 46);
}, 'Invalid length User name');

schema.path('password').validate(function(password) {
    return (typeof password === 'string'); 
}, 'Invalid type Password');

schema.path('password').validate(function(password) {
    return (password.length < 21);
}, 'Invalid length Password');



exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('MailAccountSetting', schema);
};