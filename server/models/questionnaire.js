'use strict';


/**
 * Get Dependencies
 */
var questionnaireSchema 	= require('../schemas/questionnaire').model(),
	questionnaire_status 	= require('../schemas/questionnaire').status;


/**
 * Initialize Questionnaire Model
 */
var questionnaireModel = {

	/* list */
	
	list: function (user_id, fn) {
		questionnaireSchema
			.find({ user: user_id }, '_id title purpose status questions created_at updated_at')
			.exec(function (err, questionnaires) {
				fn(err, questionnaires);
			});
	},

	/* show */

	show: function (user_id, questionnaire_id, fn) {
		questionnaireSchema
			.findOne({ user: user_id, _id: questionnaire_id }, '_id title purpose status questions created_at updated_at')
			.exec(function (err, questionnaire) {
				fn(err, questionnaire);
			});
	},

	/* create */
	
	create: function (user_id, questionnaire, fn) {
		var newQuestionnaire = new questionnaireSchema();

		newQuestionnaire.user = user_id;
		if (questionnaire.title) 		newQuestionnaire.title 		= questionnaire.title;
		if (questionnaire.purpose) 		newQuestionnaire.purpose	= questionnaire.purpose;
		if (questionnaire.status) 		newQuestionnaire.status 	= questionnaire_status.NEWLY_CREATED; // questionnaire.status;
		if (questionnaire.questions) 	newQuestionnaire.questions 	= questionnaire.questions;

		newQuestionnaire.save(function (err) {
			fn(err, newQuestionnaire);
		});
	},

	/* update */

	update: function (user_id, questionnaire_id, questionnaire, fn) {
		questionnaireSchema.findOne({ user: user_id, _id: questionnaire_id },function (err, editQuestionnaire) {
			if (err) {
				fn(err, editQuestionnaire);
			} else {
				if (questionnaire.title) 		editQuestionnaire.title			= questionnaire.title;
				if (questionnaire.purpose) 		editQuestionnaire.purpose 		= questionnaire.purpose;
				if (questionnaire.status) 		editQuestionnaire.status 		= questionnaire_status.IN_CONSTRUCTION; //questionnaire.status;
				if (questionnaire.questions) 	editQuestionnaire.questions 	= questionnaire.questions;
				editQuestionnaire.updated_at = Date.now();

				editQuestionnaire.save(function (err) {
					fn(err, editQuestionnaire);
				});
			}
		});
	},

	/* delete */

	delete: function (user_id, questionnaire_id, fn) {
		questionnaireSchema.findOne({ user: user_id, _id: questionnaire_id },function (err, questionnaire) {
			if (err) {
				fn(err, questionnaire);
			} else {
				questionnaire.remove(function (err) {
					fn(err, questionnaire);
				});
			}
		});
	}
	
};


module.exports = questionnaireModel;