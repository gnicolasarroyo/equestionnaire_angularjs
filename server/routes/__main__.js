'use strict';


/**
 * Get Dependecies
 */
var answerRouter 				= require('./answer'),
	authenticationRouter 		= require('./authentication'),
    collaboratorRouter 			= require('./collaborator'),
    contactRouter 				= require('./contact'),
    contactListRouter 			= require('./contact_list'),
    indexRouter 				= require('./index'),
    mailAccountSettingRouter	= require('./mail_account_setting'),
    questionnaireRouter 		= require('./questionnaire'),
    surveyRouter				= require('./survey'),
    userRouter 					= require('./user');


/**
 * Initialize Routes in App
 */
module.exports = function (app) {
	
	/* STATIC */

	app.use('/', authenticationRouter.static);
	app.use('/', indexRouter.static);
	app.use('/', surveyRouter.static);

	/* API */

	app.use('/api', answerRouter.api);
	app.use('/api', collaboratorRouter.api);
	app.use('/api', contactRouter.api);
	app.use('/api', contactListRouter.api);
	app.use('/api', mailAccountSettingRouter.api);
	app.use('/api', questionnaireRouter.api);
	app.use('/api', surveyRouter.api);
	app.use('/api', userRouter.api);
};