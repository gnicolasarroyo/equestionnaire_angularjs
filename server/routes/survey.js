'use strict';


/**
 * Get Dependencies
 */
var surveyController 	= require('../controllers/survey'),
	express 			= require('express'),
	authorization 		= require('./middlewares/authorization'),
	static_router 		= express.Router(),
	api_router 			= express.Router();


/**
 * Initialize Questionnaires Routes
 */

/* Preview */

// GET /survey/preview/:user_id/:survey_id
static_router.get('/survey/preview/:survey_id', surveyController.preview.get);

/* Answer */

// GET /survey/answer/:contact_id/:survey_id
static_router.get('/survey/answer/:contact_id/:survey_id', surveyController.answer.get);

// POST /survey/answer/:contact_id/:survey_id
static_router.post('/survey/answer/:contact_id/:survey_id', surveyController.answer.post);

// GET /survey/was-answered
static_router.get('/survey/was-answered', surveyController.answer.was_answered);


/* surveys */

// GET /surveys
api_router.get('/surveys', authorization.apiRequireLogin, surveyController.list);

// GET /surveys/:survey_id
api_router.get('/surveys/:survey_id', authorization.apiRequireLogin, surveyController.show);

// POST /surveys
api_router.post('/surveys', authorization.apiRequireLogin, surveyController.create);

// PUT /surveys/:survey_id
api_router.put('/surveys/:survey_id', authorization.apiRequireLogin, surveyController.update);

// DELETE /surveys/:survey_id
api_router.delete('/surveys/:survey_id', authorization.apiRequireLogin, surveyController.delete);	


module.exports.static 	= static_router;

module.exports.api 		= api_router;