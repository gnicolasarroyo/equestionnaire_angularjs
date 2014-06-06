'use strict';


/**
 * Initialize Questionnaire Controller
 */
angular.module('equestionnaire.questionnaire')
	.controller('QuestionnaireDeleteController', ['$scope', '$location', '$routeParams', 'QuestionnaireResource', function ($scope, $location, $routeParams, QuestionnaireResource) { 

		/**
		 * Initialize
		 */
		function initialize () {

			$scope.title = 'Delete questionnaire';
			$scope.links = {
				back_to_list: '#/questionnaires/'
			};

			/* onSuccess */
			function onSuccess (data) {
		    	$scope.questionnaire = data;
			}

			/* onError */
			function onError (data) {
				console.error(data);
			}

			QuestionnaireResource.get({ questionnaire_id: $routeParams.questionnaire_id }, onSuccess, onError);

		}
		// end initialize


		/**
		 * delete 
		 * @param questionnaire <Object>
		 */
		$scope.delete = function (questionnaire) {
			
			/* onSuccess */
			function onSuccess (data) {
				$location.path('/questionnaires/');
			}

			/* onError */
			function onError (data) {
				console.error(data);
			}

			$scope.questionnaire.$delete(onSuccess, onError);
			
		};
		// end $scope.delete


		initialize();

	}]);