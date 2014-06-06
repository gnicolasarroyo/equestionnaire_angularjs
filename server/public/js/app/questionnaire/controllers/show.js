'use strict';


/**
 * Initialize Questionnaire Controller
 */
angular.module('equestionnaire.questionnaire')
	.controller('QuestionnaireShowController', ['$scope', '$routeParams', 'QuestionnaireResource', function ($scope, $routeParams, QuestionnaireResource) { 
		$scope.title = 'Show questionnaire';
		$scope.links = {
			base_url: 		'#/questionnaires/',
			back_to_list: 	'#/questionnaires/'
		};

		QuestionnaireResource.get({ questionnaire_id: $routeParams.questionnaire_id }, function (questionnaire) {
	    	$scope.questionnaire = questionnaire;
	    });
	}]);