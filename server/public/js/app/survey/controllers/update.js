'use strict';


/**
 * Initialize Survey Controller
 */
angular.module('equestionnaire.survey')
	.controller('SurveyUpdateController', ['$scope', '$filter', '$location', '$routeParams', 'SurveyResource', 'QuestionnaireResource', 'MailAccountSettingResource', 'ContactResource', 'ContactListResource', function ($scope, $filter, $location, $routeParams, SurveyResource, QuestionnaireResource, MailAccountSettingResource, ContactResource, ContactListResource) { 
		
		function initialize () {
			var questionnaires, mail_account_settings, contacts, contact_lists;

			$scope.title = 'Update survey';
			$scope.links = { back_to_list: '#/surveys/' };

			$scope.only_contact_lists = false;

			function onSuccess (data) {
		    	$scope.survey = data;

			    $scope.survey = {
			    	_id: 					data._id,
			    	start_date: 			$filter('date')(data.start_date, 'yyyy-MM-dd'),
					effective_days: 		data.effective_days,
					state: 					data.state, //$filter('state-survey')(data.state),
					title: 					data.title,
					introduction: 			data.introduction,
					questions: 				data.questions,
					mail_account_setting: 	data.mail_account_setting._id,
					contacts: 				data.contacts,
					contact_lists: 			data.contact_lists,
					$update:  				data.$update
				};
				
				resetQuestion();
				resetChoice();

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
						var temp_contacts = $scope.survey.contacts;
						$scope.survey.contacts = [];

						for (var i = temp_contacts.length - 1; i >= 0; i--) {
							for (var z = data.length - 1; z >= 0; z--) {
								if (data[z]._id === temp_contacts[i]._id) {
									swap(data[z], data, $scope.survey.contacts);
									break;
								}
							};
						};

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
						var temp_contact_lists = $scope.survey.contact_lists;
						$scope.survey.contact_lists = [];

						for (var i = temp_contact_lists.length - 1; i >= 0; i--) {
							for (var z = data.length - 1; z >= 0; z--) {
								if (data[z]._id === temp_contact_lists[i]._id) {
									swap(data[z], data, $scope.survey.contact_lists);
									break;
								}
							};
						};

						$scope.contact_lists = data;
					},	
					onError: function (data) {
						console.log(data);
					}
				};
				
				ContactListResource.query(contact_lists.onSuccess, contact_lists.onError);
			}

			function onError (data) {
				console.log(data);
			}

			SurveyResource.get({ survey_id: $routeParams.survey_id }, onSuccess, onError);
		}
		
		
		/* Questions -----------------------------------------------------------------------------*/
		
		/**
		 * Reset Question
		 * @param index <Number>
		 * @param query <String>
		 * @param question_type <Number>
		 * @param choices <Object>
		 */
		function resetQuestion (index, query, question_type, choices) {
			$scope.edit_question_index = index;
			$scope.question = {
				query: 			query || '',
				question_type: 	parseInt(question_type) || 1,
				choices: 		choices || []
			};
		}
		// end resetQuestion


		/**
		 * Move question
		 * @param from <Number>
		 * @param to <Number>
		 */
		function move_question (from, to) {
			var temp_from, temp_to;

			temp_from 	= $scope.survey.questions[from];
			temp_to 	= $scope.survey.questions[to];

			$scope.survey.questions[from] 	= temp_to;
			$scope.survey.questions[to] 		= temp_from;			
		}
		// end Move question


		/**
		 * Save Question
		 * @param question <Object>
		 */
		$scope.saveQuestion = function (question) {
			if ($scope.edit_question_index > -1) $scope.survey.questions[$scope.edit_question_index] = question; 
			else $scope.survey.questions.push(question);
			resetQuestion();
		};
		// end saveQuestion


		/**
		 * Reset Question
		 */
		$scope.resetQuestion = function() {
			resetQuestion();
		};
		// end resetQuestion


		/**
		 * Move Up Question
		 * @param question <Object>
		 */
		$scope.upQuestion = function (question) {
			var index = $scope.survey.questions.indexOf(question);
			move_question(index, (index - 1));
		};
		// end upQuestion


		/**
		 * Down Question
		 * @params question <Object>
		 */
		$scope.downQuestion = function (question) {
			var index = $scope.survey.questions.indexOf(question);
			move_question(index, (index + 1));
		};
		// end downQuestion


		/**
		 * Edit Question
		 * @param question <Object>
		 */
		$scope.editQuestion = function (question) {
			resetQuestion(
					$scope.survey.questions.indexOf(question), 
					question.query, 
					question.question_type, 
					question.choices
				);
		};
		// end editQuestion


		$scope.deleteQuestion = function (question) {
			var position = $scope.survey.questions.indexOf(question);
			if (position !== -1) $scope.survey.questions.splice(position, 1);
		};


		function resetChoice () {
			$scope.choice = {
				value: ''
			};
		}


		$scope.saveChoice = function (choice) {
			$scope.question.choices.push(choice);
			resetChoice();
		};


		$scope.deleteChoice = function (choice) {
			var position = $scope.question.choices.indexOf(choice);
			if (position !== -1) $scope.question.choices.splice(position, 1);
		};
		
		/* Contacts and Contact lists -----------------------------------------------------------------------------*/

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
				$location.path('/surveys/'+data._id+'/detail/');
			}

			function onError (data) {
				console.log(data);
			}

			$scope.survey.$update(onSuccess, onError);
		};

		initialize();

	}]);