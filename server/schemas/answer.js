'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose');


/**
 * Answer Model Schema
 */
var schema = new mongoose.Schema({
	survey: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
	contact: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
	question: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
	content_response:  	{ type: mongoose.Schema.Types.Mixed, required: true },
	created_at: 		{ type: Date, default: Date.now() },
	updated_at: 		{ type: Date, default: Date.now() }
});


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Answer', schema);
};