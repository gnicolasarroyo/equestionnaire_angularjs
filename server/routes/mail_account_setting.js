'use strict';


/**
 * Get Dependencies
 */
var mailAccountSettingController  	= require('../controllers/mail_account_setting'),
	express 						= require('express'),
	authorization 					= require('./middlewares/authorization'),
	api_router 						= express.Router();


/**
 * Initialize Mail Account Settings Routes
 */

/* mail account settings */

// GET /mail-account-settings
api_router.get('/mail-account-settings', authorization.apiRequireLogin, mailAccountSettingController.list);

// GET /mail-account-settings/:mail_account_setting_id
api_router.get('/mail-account-settings/:mail_account_setting_id', authorization.apiRequireLogin, mailAccountSettingController.show);

// POST /mail-account-settings
api_router.post('/mail-account-settings', authorization.apiRequireLogin, mailAccountSettingController.create);

// PUT /mail-account-settings/:mail_account_setting_id
api_router.put('/mail-account-settings/:mail_account_setting_id', authorization.apiRequireLogin, mailAccountSettingController.update);

// DELETE /mail-account-settings/:mail_account_setting_id
api_router.delete('/mail-account-settings/:mail_account_setting_id', authorization.apiRequireLogin, mailAccountSettingController.delete);	


module.exports.api = api_router;