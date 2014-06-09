'use strict';


/**
 * Get Dependencies
 */
var answerController 	= require('../controllers/answer'),
	express 			= require('express'),
	authorization 		= require('./middlewares/authorization'),
	api_router 			= express.Router();


/**
 * Initialize Answers Routes
 */

/* Answers */

// GET /answers
api_router.get('/answers/:survey_id', authorization.apiRequireLogin, answerController.list);


module.exports.api = api_router;