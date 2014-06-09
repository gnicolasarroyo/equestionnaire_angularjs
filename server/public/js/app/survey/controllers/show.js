'use strict';


/**
 * Initialize Survey Controller
 */
angular.module('equestionnaire.survey')
	.controller('SurveyShowController', ['$scope', '$routeParams', 'SurveyResource', 'AnswerResource', function ($scope, $routeParams, SurveyResource, AnswerResource) { 
		function initialize () {
			$scope.title = 'Show survey';
			$scope.links = {
				base_url: 		'#/surveys/',
				back_to_list: 	'#/surveys/'
			};


			function onSuccess (data) {
		    	$scope.survey = data;

		    	var answer = {
		    		onSuccess: function (data) {
		    			for (var i = $scope.survey.questions.length - 1; i >= 0; i--) {
		    				for (var z = data.length - 1; z >= 0; z--) {
		    					if (data[z].question === $scope.survey.questions[i]._id) {
		    						switch ($scope.survey.questions[i].question_type) {
		    							case 1:
		    								// text
		    								if (!$scope.survey.questions[i].content_response) $scope.survey.questions[i].content_response = [];
		    								$scope.survey.questions[i].content_response.push(data[z].content_response);
		    								break;
		    							case 2:
		    								// option
		    								for (var j = $scope.survey.questions[i].choices.length - 1; j >= 0; j--) {
		    									if (!$scope.survey.questions[i].choices[j].votes) $scope.survey.questions[i].choices[j].votes = 0;
		    									if (data[z].content_response === $scope.survey.questions[i].choices[j]._id) {
		    										$scope.survey.questions[i].choices[j].votes += 1;
		    									}
		    								};
		    								break;
		    							case 3:
		    								// multiple option
		    								for (var j = $scope.survey.questions[i].choices.length - 1; j >= 0; j--) {
		    									if (!$scope.survey.questions[i].choices[j].votes) $scope.survey.questions[i].choices[j].votes = 0;
		    									for (var k = data[z].content_response.length - 1; k >= 0; k--) {
		    										if (data[z].content_response[k] === $scope.survey.questions[i].choices[j]._id) {
			    										$scope.survey.questions[i].choices[j].votes += 1;
			    									}
		    									};
		    								};
		    								break;
		    						}
		    					}
		    				};
		    			};

		    			console.log($scope.survey.questions);
		    		},

		    		onError: function (data) {
		    			console.log(data);
		    		}
		    	};

		    	AnswerResource.query({ survey_id: data._id }, answer.onSuccess, answer.onError);
		    }

		    function onError (data) {
		    	console.log(data);
		    }

			SurveyResource.get({ survey_id: $routeParams.survey_id }, onSuccess, onError);
		}

		initialize();
	}]);