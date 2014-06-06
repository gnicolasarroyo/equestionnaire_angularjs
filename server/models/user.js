'use strict';


/**
 * Get Dependencies
 */
var userSchema = require('../schemas/user').model();


/**
 * Initialize User Model
 */
var userModel = {

	/* getAttributeValue */

	getAttributeValue: function (user_id, attribute, fn) {
		userSchema.findOne({ _id: user_id },function (err, user) {
			if (err) fn(undefined);
			else fn(user[attribute]);
		});
	}
	
};


module.exports = userModel;