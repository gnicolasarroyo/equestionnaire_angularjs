'use strict';


/**
 * Get Dependecies
 */
var surveyModel = require('../models/survey'),
	answerModel = require('../models/answer');

/**
 * Initialize Survey Controller
 */
var surveyController = {

	/* preview */

	preview: {

		get: function (req, res, next) {
			surveyModel.detail(req.params.survey_id, function (err, survey) {
				if (err) res.send(404, err);
			    else {
			    	res.render('survey/preview', { 
			    		survey: 	survey, 
			    		start_date: survey.convertDate(survey.start_date), 
			    		end_date: 	survey.convertDate(survey.getEndDate()) 
			    	});
			    }
			});
		}

	},

	/* answer */

	answer: {
		
		get: function (req, res, next) {
			/*
			1 - obtengo contacto_id y survey_id 
			2.A - verifico que el contacto este en la lista de distribucion
				3.A - si existe verifico que el contacto no haya respondido 
				3.B - Ya tiene respuesta
			2.B - sino existe error
			*/
			surveyModel.detail(req.params.survey_id, function (err, survey) {
				if (err || survey == null) res.send(404, err);
			    else {
			    	if (!survey.existsContact(req.params.contact_id)) res.send(404, {});
			    	else {
			    		answerModel.contactAlreadyAnswered(req.params.survey_id, req.params.contact_id, function (err, answers) {
			    			if (err || answers.length > 0) res.redirect('/survey/was-answered');
			    			else {
			    				res.render('survey/answer_form', {
						    		survey: 	survey,
						    		start_date: survey.convertDate(survey.start_date), 
						    		end_date: 	survey.convertDate(survey.getEndDate()) 
						    	});
			    			}
			    		});
			    	}
			    }
			});
		},

		post: function (req, res, next) {
			surveyModel.detail(req.params.survey_id, function (err, survey) {
				if (err) res.send(404, err);
			    else {
			    	if (!survey.existsContact(req.params.contact_id)) res.send(404, {});
			    	else {
			    		answerModel.contactAlreadyAnswered(req.params.survey_id, req.params.contact_id, function (err, answers) {
			    			if (err || answers.length > 0) res.redirect('/survey/was-answered');
			    			else {
			    				answerModel.create(req.params.survey_id, req.params.contact_id, survey.questions, req.body);
			    				res.render('survey/answer_success', {});
			    			}
			    		});
			    	}
			    }
			});
		},

		was_answered: function (req, res, next) {
			res.render('survey/was_answered', {});
		}

	},
	
	/* list */
	
	list: function (req, res, next) {
		surveyModel.list(req.session.user, function (err, surveys) {
			if (err) res.send(404, err);
		    else res.json(surveys);
		});
	},

	/* show */

	show: function (req, res, next) {
		surveyModel.show(req.session.user, req.params.survey_id, function (err, survey) {
			if (err) res.send(404, err);
		    else res.json(survey);
		});
	},

	/* create */
	
	create: function (req, res, next) {
		surveyModel.create(req.session.user, {
			start_date:   	 		req.body.start_date,
			effective_days:  		req.body.effective_days,
			title: 					req.body.title,
			introduction: 			req.body.introduction,
			questions: 				req.body.questions,
			questionnaire: 			req.body.questionnaire,
			mail_account_setting: 	req.body.mail_account_setting,
			contacts: 				req.body.contacts,
			contact_lists: 			req.body.contact_lists
		}, function (err, survey) {
			if (err) res.send(404, err);
		    else res.json(survey);
		});
	},

	/* update */

	update: function (req, res, next) {
		surveyModel.update(req.session.user, req.params.survey_id, {
			start_date:   	 		req.body.start_date,
			effective_days:  		req.body.effective_days,
			title: 					req.body.title,
			introduction: 			req.body.introduction,
			questions: 				req.body.questions,
			mail_account_setting: 	req.body.mail_account_setting,
			contacts: 				req.body.contacts,
			contact_lists: 			req.body.contact_lists
		}, function (err, survey) {
			if (err) res.send(404, err);
		    else res.json(survey);
		});
	},

	/* delete */

	delete: function (req, res, next) {
		surveyModel.delete(req.session.user, req.params.survey_id, function (err, survey) {
			if (err) res.send(404, err);
		    else res.json(survey);
		});
	}
};


module.exports = surveyController;