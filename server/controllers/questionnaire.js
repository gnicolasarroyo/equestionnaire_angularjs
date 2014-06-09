'use strict';


/**
 * Get Dependecies
 */
var questionnaireModel = require('../models/questionnaire');


/**
 * Initialize Questionnaire Controller
 */
var questionnaireController = {
	
	/* list */
	
	list: function (req, res, next) {
		questionnaireModel.list(req.session.user, function (err, questionnaires) {
			if (err) res.send(404, err);
		    else res.json(questionnaires);
		});
	},

	/* show */

	show: function (req, res, next) {
		questionnaireModel.show(req.session.user, req.params.questionnaire_id, function (err, questionnaire) {
			if (err) res.send(404, err);
		    else res.json(questionnaire);
		});
	},

	/* create */
	
	create: function (req, res, next) {
		questionnaireModel.create(req.session.user, {
			title: 		req.body.title,
			purpose: 	req.body.purpose,
			questions:  req.body.questions
		}, function (err, questionnaire) {
			if (err) res.send(404, err);
		    else res.json(questionnaire);
		});
	},

	/* update */

	update: function (req, res, next) {
		questionnaireModel.update(req.session.user, req.params.questionnaire_id, {
			title: 		req.body.title,
			purpose: 	req.body.purpose,
			questions:  req.body.questions
		}, function (err, questionnaire) {
			if (err) res.send(404, err);
		    else res.json(questionnaire);
		});
	},

	/* delete */

	delete: function (req, res, next) {
		questionnaireModel.delete(req.session.user, req.params.questionnaire_id, function (err, questionnaire) {
			if (err) res.send(404, err);
		    else res.json(questionnaire);
		});
	}
};


module.exports = questionnaireController;