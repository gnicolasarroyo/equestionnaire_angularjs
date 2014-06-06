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
api_router.get('/answers', authorization.apiRequireLogin, answerController.list);

// GET /answers/:answer_id
api_router.get('/answers/:answer_id', authorization.apiRequireLogin, answerController.show);

// POST /answers
api_router.post('/answers', authorization.apiRequireLogin, answerController.create);

// PUT /answers/:answer_id
api_router.put('/answers/:answer_id', authorization.apiRequireLogin, answerController.update);

// DELETE /answers/:answer_id
api_router.delete('/answers/:answer_id', authorization.apiRequireLogin, answerController.delete);


module.exports.api = api_router;