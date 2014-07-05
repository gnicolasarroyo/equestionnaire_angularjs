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
	questions: 		[questionSchema],
	created_at: 	{ type: Date, default: Date.now() },
	updated_at: 	{ type: Date, default: Date.now() }
});

/**
 * Validations
 */
schema.path('title').validate(function(title) {
    return (typeof title === 'string'); 
}, 'Invalid type Title');

schema.path('title').validate(function(title) {
    return (title.length > 4 && title.length < 36);
}, 'Invalid length Title');

schema.path('purpose').validate(function(purpose) {
    return (typeof purpose === 'string'); 
}, 'Invalid type Purpose');

schema.path('purpose').validate(function(purpose) {
    return (purpose.length > 4 && purpose.length < 251);
}, 'Invalid length Purpose');

schema.path('questions').validate(function(questions) {
    return (typeof questions === 'object'); 
}, 'Invalid type Questions');

schema.path('questions').validate(function(questions) {
    return (questions.length > 0 && questions.length < 11);
}, 'Invalid lengte Questions');

exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Questionnaire', schema);
};

