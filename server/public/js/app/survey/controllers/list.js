'use strict';


/**
 * Initialize Survey Controller
 */
angular.module('equestionnaire.survey')
	.controller('SurveyListController', ['$scope', '$routeParams', 'SurveyResource', function ($scope, $routeParams, SurveyResource) { 
		function initialize () {
			$scope.title = 'List survey';
			$scope.links = {
				base_url: 	'#/surveys/',
				new: 		'#/surveys/new/'
			};

			function onSuccess (data) {
				$scope.surveys = data;
				$scope.list_on = (data.length > 0);
			}

			function onError (data) {
				console.log(data);
			}

			SurveyResource.query(onSuccess, onError);
		}

		initialize();
	}]);