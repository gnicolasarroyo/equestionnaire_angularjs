'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose');


/**
 * Choice Model Schema
 */
var schema = new mongoose.Schema({
	value: { type: String, required: true }
});


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Choice', schema);
};