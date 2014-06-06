'use strict';


/**
 * Initialize Questionnaire Controller
 */
angular.module('equestionnaire.questionnaire')
	.controller('QuestionnaireCreateController', ['$scope', '$location', 'QuestionnaireResource', function ($scope, $location, QuestionnaireResource) { 
		
		/**
		 * Initialize
		 */
		function initialize () {
			$scope.title = 'Create questionnaire';
			
			$scope.links = {
				back_to_list: '#/questionnaires/'
			};
			
			$scope.questionnaire = {
				title: '',
				purpose: '',
				status: 0,
				questions: []
			};

			resetQuestion();
			
			resetChoice();
		};
		// end initialize


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
		 * Swap
		 * @param from <Number>
		 * @param to <Number>
		 */
		function swap (from, to) {
			var temp_from, temp_to;

			temp_from 	= $scope.questionnaire.questions[from];
			temp_to 	= $scope.questionnaire.questions[to];

			$scope.questionnaire.questions[from] 	= temp_to;
			$scope.questionnaire.questions[to] 		= temp_from;			
		}
		// end swap


		/**
		 * Save Question
		 * @param question <Object>
		 */
		$scope.saveQuestion = function (question) {
			if ($scope.edit_question_index > -1) $scope.questionnaire.questions[$scope.edit_question_index] = question; 
			else $scope.questionnaire.questions.push(question);
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
			var index = $scope.questionnaire.questions.indexOf(question);
			swap(index, (index - 1));
		};
		// end upQuestion


		/**
		 * Down Question
		 * @params question <Object>
		 */
		$scope.downQuestion = function (question) {
			var index = $scope.questionnaire.questions.indexOf(question);
			swap(index, (index + 1));
		};
		// end downQuestion


		/**
		 * Edit Question
		 * @param question <Object>
		 */
		$scope.editQuestion = function (question) {
			resetQuestion(
					$scope.questionnaire.questions.indexOf(question), 
					question.query, 
					question.question_type, 
					question.choices
				);
		};
		// end editQuestion


		$scope.deleteQuestion = function (question) {
			var position = $scope.questionnaire.questions.indexOf(question);
			if (position !== -1) $scope.questionnaire.questions.splice(position, 1);
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
		

		$scope.save = function (questionnaire) {
			
			var newQuestionnaire 		= new QuestionnaireResource();
		    newQuestionnaire.title	 	= questionnaire.title;
		    newQuestionnaire.purpose 	= questionnaire.purpose;
		    newQuestionnaire.status 	= 1;
		    newQuestionnaire.questions 	= questionnaire.questions;

		    function onSuccess (data) {
		    	$location.path('/questionnaires/'+data._id+'/detail/');
		    }

		    function onError (data) {
		    	console.error(data)
		    }

		    newQuestionnaire.$save(onSuccess, onError);

		};

		initialize();
	}]);