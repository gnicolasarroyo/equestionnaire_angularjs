'use strict';


/**
 * Get Dependencies
 */
var questionnaireController = require('../controllers/questionnaire'),
	express 				= require('express'),
	authorization 			= require('./middlewares/authorization'),
	api_router 				= express.Router();


/**
 * Initialize Questionnaires Routes
 */

/* questionnaires */

// GET /questionnaires
api_router.get('/questionnaires', authorization.apiRequireLogin, questionnaireController.list);

// GET /questionnaires/:questionnaire_id
api_router.get('/questionnaires/:questionnaire_id', authorization.apiRequireLogin, questionnaireController.show);

// POST /questionnaires
api_router.post('/questionnaires', authorization.apiRequireLogin, questionnaireController.create);

// PUT /questionnaires/:questionnaire_id
api_router.put('/questionnaires/:questionnaire_id', authorization.apiRequireLogin, questionnaireController.update);

// DELETE /questionnaires/:questionnaire_id
api_router.delete('/questionnaires/:questionnaire_id', authorization.apiRequireLogin, questionnaireController.delete);	


module.exports.api = api_router;