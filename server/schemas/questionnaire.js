'use strict';


/**
 * Get Dependencies
 */
var mongoose 		= require('mongoose'),
	questionSchema 	= require('./question').schema();


/**
 * Questionnaire Model Schema
 */
var schema = new mongoose.Schema({
	user: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	title: 			{ type: String, required: true },
	purpose: 		{ type: String, required: true },
	status: 		{ type: Number, required: true },
	questions: 		[questionSchema],
	created_at: 	{ type: Date, default: Date.now() },
	updated_at: 	{ type: Date, default: Date.now() }
});


exports.status = { NEWLY_CREATED: 0, IN_CONSTRUCTION: 1, ONLINE: 2, FREE_FOR_USE: 3 };


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Questionnaire', schema);
};

