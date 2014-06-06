'use strict';


/**
 * Get Dependencies
 */
var authenticationController  	= require('../controllers/authentication'),
	express 					= require('express'),
	authorization 				= require('./middlewares/authorization'),
	static_router 				= express.Router();


/**
 * Initialize Authentication Routes
 */

/* user register */

// GET /authentication/user-register
static_router.get('/authentication/user-register', authenticationController.user_register.get);

// POST /authentication/user-register
static_router.post('/authentication/user-register', authenticationController.user_register.post);

/* change password */

// GET /authentication/change-password
static_router.get('/authentication/change-password', authorization.requireLogin, authenticationController.change_password.get);

// POST /authentication/change-password
static_router.post('/authentication/change-password', authorization.requireLogin, authenticationController.change_password.post);

/* login */

// GET /authentication/login
static_router.get('/authentication/login', authenticationController.login.get);

// POST /authentication/login
static_router.post('/authentication/login', authenticationController.login.post);

/* logout */

// GET /authentication/logout
static_router.get('/authentication/logout', authorization.requireLogin, authenticationController.logout.get);


module.exports.static = static_router;