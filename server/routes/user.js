'use strict';


/**
 * Get Dependencies
 */
var userController 	= require('../controllers/user'),
	express 		= require('express'),
	authorization 	= require('./middlewares/authorization'),
	api_router 		= express.Router();


/**
 * Initialize Users Routes
 */

/* Users */

// GET /users
api_router.get('/users', authorization.apiRequireLogin, userController.list);

// GET /users/:user_id
api_router.get('/users/:user_id', authorization.apiRequireLogin, userController.show);

// POST /users
api_router.post('/users', authorization.apiRequireLogin, userController.create);

// PUT /users/:user_id
api_router.put('/users/:user_id', authorization.apiRequireLogin, userController.update);

// DELETE /users/:user_id
api_router.delete('/users/:user_id', authorization.apiRequireLogin, userController.delete);


module.exports.api = api_router;