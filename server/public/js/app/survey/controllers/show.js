'use strict';


/**
 * Initialize Survey Controller
 */
angular.module('equestionnaire.survey')
	.controller('SurveyShowController', ['$scope', '$routeParams', 'SurveyResource', function ($scope, $routeParams, SurveyResource) { 
		function initialize () {
			$scope.title = 'Show survey';
			$scope.links = {
				base_url: 		'#/surveys/',
				back_to_list: 	'#/surveys/'
			};


			function onSuccess (data) {
		    	$scope.survey = data;
		    }

		    function onError (data) {
		    	console.log(data);
		    }

			SurveyResource.get({ survey_id: $routeParams.survey_id }, onSuccess, onError);
		}

		initialize();
	}]);