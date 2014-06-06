'use strict';


/**
 * Initialize Survey Controller
 */
angular.module('equestionnaire.survey')
	.controller('SurveyDeleteController', ['$scope', '$location', '$routeParams', 'SurveyResource', function ($scope, $location, $routeParams, SurveyResource) { 
		
		function initialize () {
			$scope.title = 'Delete survey';
			$scope.links = {
				back_to_list: '#/surveys/'
			};

			function onSuccess (data) {
		    	$scope.survey = data;
			}

			function onError (data) {
				console.log(data);
			}

			SurveyResource.get({ survey_id: $routeParams.survey_id }, onSuccess, onError);
		}

		$scope.delete = function (survey) {
			function onSuccess (data) {
				$location.path('/surveys/');
			}

			function onError (data) {
				console.log(data);
			}

			$scope.survey.$delete(onSuccess, onError);
		};

		initialize();
	}]);