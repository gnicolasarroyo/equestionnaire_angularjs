'use strict';


/**
 * Get Dependencies
 */
var contactController 		= require('../controllers/contact'),
	express 				= require('express'),
	authorization 			= require('./middlewares/authorization'),
	api_router 				= express.Router();


/**
 * Initialize Contacts Routes
 */

/* contacts */

// GET /contacts
api_router.get('/contacts', authorization.apiRequireLogin, contactController.list);

// GET /contacts/:contact_id
api_router.get('/contacts/:contact_id', authorization.apiRequireLogin, contactController.show);

// POST /contacts
api_router.post('/contacts', authorization.apiRequireLogin, contactController.create);

// PUT /contacts/:contact_id
api_router.put('/contacts/:contact_id', authorization.apiRequireLogin, contactController.update);

// DELETE /contacts/:contact_id
api_router.delete('/contacts/:contact_id', authorization.apiRequireLogin, contactController.delete);	


module.exports.api = api_router;