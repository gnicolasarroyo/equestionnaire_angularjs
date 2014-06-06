'use strict';


/**
 * Get Dependecies
 */
var userModel = require('../models/user');


/**
 * Initialize Index Controller
 */
var indexController = {

	/* index */

	index: {

		get: function (req, res, next) {
			var first_name, last_name;

			userModel.getAttributeValue(req.session.user, 'first_name', function (value) {
				first_name = value;

				userModel.getAttributeValue(req.session.user, 'last_name', function (value) {
					last_name = value;
					res.render('index/index', { username: first_name + ' ' + last_name });
				});
			});
		}
	}
	
};


module.exports = indexController;