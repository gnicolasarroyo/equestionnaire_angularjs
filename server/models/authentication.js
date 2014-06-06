'use strict';


/**
 * Get Dependencies
 */
var userSchema = require('../schemas/user').model();


/**
 * Initialize Authentication Model
 */
var authenticationModel = {

	/* user register */

	userRegister: function (params, fn) {
		var result = { status: false, errors: [] };
		
		if (typeof params.password === 'string' && params.password.length >= 8 && params.password.length <= 12) result.status = true;
		else result.status = false;result.errors.push({ field: 'password', notification: 'Password length error, min 8 - max 12'});

		if (params.password === params.confirm_password) result.status = true;
		else result.status = false; result.errors.push({ field: 'password', notification: 'Password and Confirm password error'});
		
		if (result.status) {
			var user = new userSchema();
			user.first_name = params.first_name;
			user.last_name 	= params.last_name;
			user.email		= params.email;
			user.password 	= params.password;
			user.save(function (err) {
				if (!err) result.user = user;
				else result.status = false; result.errors.push({ field: 'database', notification: 'Fail save user'});

				fn(result);
			});
		} else {
			fn(result);
		}
	},

	/* change password */

	changePassword: function (params, fn) {
		var result = { status: false, errors: [] };
		
		if (typeof params.password === 'string' && params.password.length >= 8 && params.password.length <= 12) result.status = true;
		else result.status = false;result.errors.push({ field: 'password', notification: 'Password length error, min 8 - max 12'});

		if (result.status && params.password === params.confirm_password) result.status = true;
		else result.status = false;result.errors.push({ field: 'password', notification: 'Password and Confirm password error'});
		
		if (result.status) {
			userSchema.findOne({ _id: params._id },function (err, user) {
				if (err) {
					result.status = false;
					result.errors.push({ field: 'database', notification: 'Fail search user' });
				} else {
					user.password = params.password;
					user.save(function (err) {
						if (!err) result.user = user;
						else result.status = false; result.errors.push({ field: 'database', notification: 'Fail save user'});
					});
				}

				fn(result);
			});
		} else {
			fn(result);
		}
	},

	/* login */

	login: function (params, fn) {
		var result = { status: false, errors: [] };
		
		if (typeof params.password === 'string' && params.password.length >= 8 && params.password.length <= 12) { 
			result.status = true;
		} else {
			result.status = false;
			result.errors.push({ field: 'password', notification: 'Password length error, min 8 - max 12'});	
		}

		if (result.status === true) {
			userSchema.findOne({ 'email': params.email }, function (err, user) {
				if (err) {
					result.status = false;
					result.errors.push({ field: 'database', notification: 'Fail search user' });
				} else {
					if (user.authenticate(params.password)) {
						result.user = user;
					} else {
						result.status = false; 
						result.errors.push({ field: 'database', notification: 'Fail authenticate user'});
					} 
				}

				fn(result);
			});
		} else {
			fn(result);
		}
	}
};


module.exports = authenticationModel;