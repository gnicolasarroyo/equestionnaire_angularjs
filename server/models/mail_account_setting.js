'use strict';


/**
 * Get Dependencies
 */
var mailAccountSettingSchema = require('../schemas/mail_account_setting').model();


/**
 * Initialize Mail Account Setting Model
 */
var mailAccountSettingModel = {

	/* list */
	
	list: function (user_id, fn) {
		mailAccountSettingSchema
			.find({ user: user_id }, '_id name host port username created_at updated_at')
			.exec(function (err, mailAccountSettings) {
				fn(err, mailAccountSettings);
			});
	},

	/* show */

	show: function (user_id, mail_account_setting_id, fn) {
		mailAccountSettingSchema
			.findOne({ user: user_id, _id: mail_account_setting_id }, '_id name host port username password created_at updated_at')
			.exec(function (err, mailAccountSetting) {
				fn(err, mailAccountSetting);
			});
	},

	/* create */
	
	create: function (user_id, mailAccountSetting, fn) {
		var newMailAccountSetting = new mailAccountSettingSchema();

		newMailAccountSetting.user = user_id;
		if (mailAccountSetting.name) 		newMailAccountSetting.name	 	= mailAccountSetting.name;
		if (mailAccountSetting.host) 		newMailAccountSetting.host	 	= mailAccountSetting.host;
		if (mailAccountSetting.port) 		newMailAccountSetting.port	 	= mailAccountSetting.port;
		if (mailAccountSetting.username) 	newMailAccountSetting.username 	= mailAccountSetting.username;
		if (mailAccountSetting.password) 	newMailAccountSetting.password 	= mailAccountSetting.password;

		newMailAccountSetting.save(function (err) {
			fn(err, newMailAccountSetting);
		});
	},

	/* update */

	update: function (user_id, mail_account_setting_id, mailAccountSetting, fn) {
		mailAccountSettingSchema.findOne({ user: user_id, _id: mail_account_setting_id }, function (err, editMailAccountSetting) {
			if (err) {
				fn(err, editMailAccountSetting);
			} else {
				if (mailAccountSetting.name) 		editMailAccountSetting.name		= mailAccountSetting.name;
				if (mailAccountSetting.host) 		editMailAccountSetting.host	 	= mailAccountSetting.host;
				if (mailAccountSetting.port) 		editMailAccountSetting.port	 	= mailAccountSetting.port;
				if (mailAccountSetting.username) 	editMailAccountSetting.username = mailAccountSetting.username;
				if (mailAccountSetting.password) 	editMailAccountSetting.password = mailAccountSetting.password;
				editMailAccountSetting.updated_at 	= Date.now();

				editMailAccountSetting.save(function (err) {
					fn(err, editMailAccountSetting);
				});
			}
		});
	},

	/* delete */

	delete: function (user_id, mail_account_setting_id, fn) {
		mailAccountSettingSchema.findOne({ user: user_id, _id: mail_account_setting_id }, function (err, mailAccountSetting) {
			if (err) {
				fn(err, mailAccountSetting);
			} else {
				mailAccountSetting.remove(function (err) {
					fn(err, mailAccountSetting);
				});
			}
		});
	}
	
};


module.exports = mailAccountSettingModel;