'use strict';


/**
 * Get Dependencies
 */
var survey_state 			= require('../schemas/survey').state_code,
	surveySchema 			= require('../schemas/survey').model();


/**
 * Initialize Survey Model
 */
var surveyModel = {

	/* list */
	
	list: function (user_id, fn) {
		surveySchema
			.find({ user: user_id }, '_id start_date effective_days state title introduction questions mail_account_setting contacts contact_lists created_at updated_at')
			.populate({path: 'mail_account_setting', select: '_id name'})
			.populate({path: 'contacts', select: '_id name email'})
			.populate({path: 'contact_lists', select: '_id name contacts'})
			.exec(function (err, surveys) {
				fn(err, surveys);
			});
	},

	/* show */

	show: function (user_id, survey_id, fn) {
		surveySchema
			.findOne({ user: user_id, _id: survey_id }, '_id start_date effective_days state title introduction questions mail_account_setting contacts contact_lists created_at updated_at')
			.populate({path: 'mail_account_setting', select: '_id name'})
			.populate({path: 'contacts', select: '_id name email'})
			.populate({path: 'contact_lists', select: '_id name contacts'})
			.exec(function (err, survey) {
				fn(err, survey);
			});
	},

	/* create */
	
	create: function (user_id, survey, fn) {
		var newSurvey = new surveySchema();

		newSurvey.user = user_id;
		if (survey.start_date) 	newSurvey.start_date = survey.start_date;
		if (survey.effective_days) 	newSurvey.effective_days = survey.effective_days;
		newSurvey.state = survey_state.NEWLY_CREATED;
		if (survey.title) newSurvey.title = survey.title; 
		if (survey.introduction) newSurvey.introduction = survey.introduction; 
		if (survey.questions) newSurvey.questions = survey.questions;
		if (survey.mail_account_setting) newSurvey.mail_account_setting = survey.mail_account_setting;
		if (survey.contacts) {
			newSurvey.contacts = [];
			for (var i = survey.contacts.length - 1; i >= 0; i--) {
				newSurvey.contacts.push(survey.contacts[i]._id);
			}
		}
		if (survey.contact_lists) {
			newSurvey.contact_lists = [];
			for (var i = survey.contact_lists.length - 1; i >= 0; i--) {
				newSurvey.contact_lists.push(survey.contact_lists[i]._id);
			}
		}

		newSurvey.save(function (err) {
			fn(err, newSurvey);
		});
	},

	/* update */

	update: function (user_id, survey_id, survey, fn) {
		surveySchema.findOne({ user: user_id, _id: survey_id },function (err, editSurvey) {
			if (err || !editSurvey) {
				fn(err, editSurvey);
			} else {
				if (survey.start_date) editSurvey.start_date = survey.start_date;
				if (survey.effective_days) editSurvey.effective_days = survey.effective_days;
				editSurvey.state = survey_state.UPDATED;
				if (survey.title) editSurvey.title = survey.title; 
				if (survey.introduction) editSurvey.introduction = survey.introduction; 
				if (survey.questions) editSurvey.questions = survey.questions;
				if (survey.mail_account_setting) editSurvey.mail_account_setting = survey.mail_account_setting;
				if (survey.contacts) {
					editSurvey.contacts = [];
					for (var i = survey.contacts.length - 1; i >= 0; i--) {
						editSurvey.contacts.push(survey.contacts[i]._id);
					}
				}
				if (survey.contact_lists) {
					editSurvey.contact_lists = [];
					for (var i = survey.contact_lists.length - 1; i >= 0; i--) {
						editSurvey.contact_lists.push(survey.contact_lists[i]._id);
					}
				}
				editSurvey.updated_at = Date.now();

				editSurvey.save(function (err) {
					fn(err, editSurvey);
				});
			}
		});
	},

	/* delete */

	delete: function (user_id, survey_id, fn) {
		surveySchema.findOne({ user: user_id, _id: survey_id },function (err, survey) {
			if (err || !survey) fn(err, survey);
			else { 
				survey.remove(function (err) {
					fn(err, survey);
				});
			}
		});
	},

	/* detail */
	
	detail: function (survey_id, fn) {
		surveySchema
			.findOne({ _id: survey_id }, 'user start_date effective_days state title introduction questions contacts contact_lists')
			.populate({path: 'user', select: 'first_name last_name'})
			.populate({path: 'contacts', select: '_id'})
			.populate({path: 'contact_lists', select: 'contacts'})
			.exec(function (err, survey) {
				fn(err, survey);
			});
	}
};


module.exports = surveyModel;