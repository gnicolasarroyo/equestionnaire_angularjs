'use strict';


/**
 * Initialize Survey Controller
 */
angular.module('equestionnaire.survey')
	.controller('SurveyCreateController', ['$scope', '$location', 'SurveyResource', 'QuestionnaireResource', 'MailAccountSettingResource', 'ContactResource', 'ContactListResource', function ($scope, $location, SurveyResource, QuestionnaireResource, MailAccountSettingResource, ContactResource, ContactListResource) { 
		

		/**
		 * Initialize
		 */
		function initialize () {
			var questionnaires, mail_account_settings, contacts, contact_lists;

			$scope.title = 'Create survey';
			$scope.links = { back_to_list: '#/surveys/' };
			$scope.only_contact_lists = false;

			$scope.survey = {
				start_date: 			new Date(),
				effective_days: 		30,
				title: 					'',
				introduction: 			'',
				questions: 				[],
				mail_account_setting: 	'',
				contacts: 				[],
				contact_lists: 			[]
			};

	
			/* get Questionnaires */

			questionnaires = {
				onSuccess: function (data) {
					$scope.questionnaires = data;
				},	
				onError: function (data) {
					console.log(data);
				}
			};

			QuestionnaireResource.query(questionnaires.onSuccess, questionnaires.onError);
			
			
			/* get Mails Account Settings */

			mail_account_settings = {
				onSuccess: function (data) {
					$scope.mail_account_settings = data;
				},	
				onError: function (data) {
					console.log(data);
				}
			};

			MailAccountSettingResource.query(mail_account_settings.onSuccess, mail_account_settings.onError);

			
			/* get Contacts */

			contacts = {
				onSuccess: function (data) {
					$scope.available_list_on = data.length > 0 ? true : false;
					$scope.contacts = data;
				},	
				onError: function (data) {
					console.log(data);
				}
			};

			ContactResource.query(contacts.onSuccess, contacts.onError);


			/* get Contacts Lists */

			contact_lists = {
				onSuccess: function (data) {
					$scope.contact_lists = data;
				},	
				onError: function (data) {
					console.log(data);
				}
			};
			
			ContactListResource.query(contact_lists.onSuccess, contact_lists.onError);
		}


		function swap (item, from, to) {
			to.push(item);
			from.splice(from.indexOf(item),1);
		}

		
		$scope.avaibleCheckContact = function (item) {
			swap(item, $scope.contacts, $scope.survey.contacts);
		};

		
		$scope.selectedCheckContact = function (item) {
			swap(item, $scope.survey.contacts, $scope.contacts);
		};

		
		$scope.avaibleCheckContactList = function (item) {
			swap(item, $scope.contact_lists, $scope.survey.contact_lists);
		};

		
		$scope.selectedCheckContactList = function (item) {
			swap(item, $scope.survey.contact_lists, $scope.contact_lists);
		};

		
		$scope.save = function (survey) {
			
			function onSuccess (data) {
		    	$location.path('/surveys/' + data._id + '/detail/');
		    }

		    function onError (data) {
		    	console.log(data);
		    }

			var newSurvey 		= new SurveyResource(), 
				questionnaire 	= $scope.questionnaires[survey.questionnaire];
		    
		    newSurvey.start_date 				= survey.start_date;
			newSurvey.effective_days 			= survey.effective_days;
			newSurvey.title  					= questionnaire.title;
		    newSurvey.introduction 				= questionnaire.purpose;
		    newSurvey.questions 				= questionnaire.questions;
			newSurvey.mail_account_setting 		= survey.mail_account_setting;
			newSurvey.contacts 					= survey.contacts;
			newSurvey.contact_lists 			= survey.contact_lists;

		    newSurvey.$save(onSuccess, onError);  
		};

		
		initialize();

	}]);