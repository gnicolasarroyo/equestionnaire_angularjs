'use strict';


/**
 * Get Dependencies
 */
var contactListController 	= require('../controllers/contact_list'),
	express 				= require('express'),
	authorization 			= require('./middlewares/authorization'),
	api_router 				= express.Router();


/**
 * Initialize Contact Lists Routes
 */

/* contact lists */

// GET /contact-lists
api_router.get('/contact-lists', authorization.apiRequireLogin, contactListController.list);

// GET /contact-lists/:contact_list_id
api_router.get('/contact-lists/:contact_list_id', authorization.apiRequireLogin, contactListController.show);

// POST /contact-lists
api_router.post('/contact-lists', authorization.apiRequireLogin, contactListController.create);

// PUT /contact-lists/:contact_list_id
api_router.put('/contact-lists/:contact_list_id', authorization.apiRequireLogin, contactListController.update);

// DELETE /contact-lists/:contact_list_id
api_router.delete('/contact-lists/:contact_list_id', authorization.apiRequireLogin, contactListController.delete);	


module.exports.api = api_router;