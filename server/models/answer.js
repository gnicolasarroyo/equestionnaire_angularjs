'use strict';


/**
 * Get Dependencies
 */
var answerSchema = require('../schemas/answer').model();


/**
 * Initialize Answer Model
 */
var answerModel = {

	/* list */
	
	list: function (survey_id, fn) {
		answerSchema
			.find({ survey: survey_id }, '_id survey contact question content_response created_at updated_at')
			.populate({path: 'contact', select: '_id name email'})
			.exec(function (err, answers) {
				fn(err, answers);
			});
	},

	/* create */
	
	create: function (survey_id, contact_id, questions, answers, fn) {
		for (var i = questions.length - 1; i >= 0; i--) {
			var newAnswer = new answerSchema();

			newAnswer.survey 			= survey_id;
			newAnswer.contact			= contact_id;
			newAnswer.question  		= questions[i]._id;
			newAnswer.content_response 	= answers[questions[i]._id];

			newAnswer.save();
		};
	},
	
	contactAlreadyAnswered: function (survey_id, contact_id, fn) {
		answerSchema
			.find({ survey: survey_id, contact: contact_id }, '_id')
			.exec(function (err, answers) {
				fn(err, answers);
			});
	}
};


module.exports = answerModel;