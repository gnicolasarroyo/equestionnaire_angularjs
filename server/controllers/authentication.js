'use strict';


/**
 * Get Dependecies
 */
var authenticationModel = require('../models/authentication');


/**
 * Initialize Authentication Controller
 */
var authenticationController = {

	/* user register */

	user_register: {

		get: function (req, res, next) {
			res.render('authentication/user_register', { errors: [] });
		},

		post: function (req, res, next) {
			authenticationModel.userRegister({
				first_name: 		req.body.first_name ? req.body.first_name : '',
				last_name: 			req.body.last_name ? req.body.last_name : '',
				email: 				req.body.email ? req.body.email : '',
				password: 			req.body.password ? req.body.password : '',
				confirm_password: 	req.body.confirm_password ? req.body.confirm_password : ''
			}, function (result) {
				if (result.status) res.redirect('/authentication/login');
				else res.render('authentication/user_register', { errors: result.errors });
			});
		}
	},

	/* change password */

	change_password: {

		get: function (req, res, next) {
			res.render('authentication/change_password', { errors: [] });
		},

		post: function (req, res, next) {
			authenticationModel.changePassword({
				_id: 				req.session.user,
				password: 			req.body.password ? req.body.password : '',
				confirm_password: 	req.body.confirm_password ? req.body.confirm_password : ''
			}, function (result) {
				if (result.status) res.redirect('/authentication/logout');
				else res.render('authentication/change_password', { errors: result.errors });
			});
		}
	},

	/* login */

	login: {

		get: function (req, res, next) {
			res.render('authentication/login', { errors: [] });
		},

		post: function (req, res, next) {
			authenticationModel.login({
				email: 		req.body.email ? req.body.email : '',
				password: 	req.body.password ? req.body.password : ''
			}, function (result) {
				if (result.status) {
					req.session.regenerate(function(err){
						req.session.user = result.user._id;
						res.redirect('/');
					});
				} else {
					res.render('authentication/login', { errors: result.errors });
				}
			});
		}
	},

	/* logout */

	logout: {

		get: function (req, res, next) {
			req.session.destroy(function (err) {
				res.clearCookie('connect.sid', { path: '/' });
				res.redirect('/authentication/login');
			});
		}
	}
	
};


module.exports = authenticationController;