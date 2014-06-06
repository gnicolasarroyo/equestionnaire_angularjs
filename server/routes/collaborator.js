'use strict';


/**
 * Get Dependencies
 */
var collaboratorController  = require('../controllers/collaborator'),
	express 				= require('express'),
	authorization 			= require('./middlewares/authorization'),
	api_router 				= express.Router();


/**
 * Initialize Collaborators Routes
 */

/* Collaborators */

// GET /collaborators
api_router.get('/questionnaires/:questionnaire_id/collaborators', authorization.apiRequireLogin, collaboratorController.list);

// GET /collaborators/:collaborator_id
api_router.get('/questionnaires/:questionnaire_id/collaborators/:collaborator_id', authorization.apiRequireLogin, collaboratorController.show);

// POST /collaborators
api_router.post('/questionnaires/:questionnaire_id/collaborators', authorization.apiRequireLogin, collaboratorController.create);

// PUT /collaborators/:collaborator_id
api_router.put('/questionnaires/:questionnaire_id/collaborators/:collaborator_id', authorization.apiRequireLogin, collaboratorController.update);

// DELETE /collaborators/:collaborator_id
api_router.delete('/questionnaires/:questionnaire_id/collaborators/:collaborator_id', authorization.apiRequireLogin, collaboratorController.delete);


module.exports.api = api_router;