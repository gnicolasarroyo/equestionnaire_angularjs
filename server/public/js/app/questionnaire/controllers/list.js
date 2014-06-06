'use strict';


/**
 * Initialize Questionnaire Controller
 */
angular.module('equestionnaire.questionnaire')
	.controller('QuestionnaireListController', ['$scope', '$routeParams', 'QuestionnaireResource', function ($scope, $routeParams, QuestionnaireResource) { 
		$scope.title = 'List questionnaire';
		$scope.links = {
			base_url: 	'#/questionnaires/',
			new: 		'#/questionnaires/new/'
		};

		QuestionnaireResource.query(function (questionnaires) {
			$scope.questionnaires = questionnaires;
			$scope.list_on 	= ($scope.questionnaires.length > 0);
		});
	}]);