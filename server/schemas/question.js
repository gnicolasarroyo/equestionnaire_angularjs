'use strict';


/**
 * Get Dependencies
 */
var mongoose 		= require('mongoose'),
	choiceSchema 	= require('./choice').schema();


/**
 * Question Model Schema
 */
var schema = new mongoose.Schema({
	query: 			{ type: String, required: true },
	question_type: 	{ type: Number, required: true },
	choices: 		[choiceSchema]
});


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Question', schema);
};