'use strict';


/**
 * Get Dependencies
 */
var indexController	= require('../controllers/index'),
	express 		= require('express'),
	authorization 	= require('./middlewares/authorization'),
	static_router 	= express.Router();


/**
 * Initialize index Routes
 */

/* index */

// GET /
static_router.get('/', authorization.requireLogin, indexController.index.get);


module.exports.static = static_router;