'use strict';


/**
 * Get Dependecies
 */
var mailAccountSettingModel = require('../models/mail_account_setting');


/**
 * Initialize Mail Account Setting Controller
 */
var mailAccountSettingController = {
	
	/* list */
	
	list: function (req, res, next) {
		mailAccountSettingModel.list(req.session.user, function (err, mailAccountSettings) {
			if (err) res.send(404, err);
		    else res.json(mailAccountSettings);
		});
	},

	/* show */

	show: function (req, res, next) {
		mailAccountSettingModel.show(req.session.user, req.params.mail_account_setting_id, function (err, mailAccountSetting) {
			if (err) res.send(404, err);
		    else res.json(mailAccountSetting);
		});
	},

	/* create */
	
	create: function (req, res, next) {
		mailAccountSettingModel.create(req.session.user, {
			name: 		req.body.name,
			host: 		req.body.host,
			port: 		req.body.port,
			username: 	req.body.username,
			password: 	req.body.password
		}, function (err, mailAccountSetting) {
			if (err) res.send(404, err);
		    else res.json(mailAccountSetting);
		});
	},

	/* update */

	update: function (req, res, next) {
		mailAccountSettingModel.update(req.session.user, req.params.mail_account_setting_id, {
			name: 		req.body.name,
			host: 		req.body.host,
			port: 		req.body.port,
			username: 	req.body.username,
			password: 	req.body.password
		}, function (err, mailAccountSetting) {
			if (err) res.send(404, err);
		    else res.json(mailAccountSetting);
		});
	},

	/* delete */

	delete: function (req, res, next) {
		mailAccountSettingModel.delete(req.session.user, req.params.mail_account_setting_id, function (err, mailAccountSetting) {
			if (err) res.send(404, err);
		    else res.json(mailAccountSetting);
		});
	}
};


module.exports = mailAccountSettingController;