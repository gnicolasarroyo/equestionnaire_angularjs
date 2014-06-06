'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose');


/**
 * Collaborator Model Schema
 */
var schema = new mongoose.Schema({
	user: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	questionnaire: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire' },
	created_at: 	{ type: Date, default: Date.now() }
});


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Collaborator', schema);
};