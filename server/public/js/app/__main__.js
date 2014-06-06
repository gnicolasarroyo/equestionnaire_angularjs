'use strict';


/**
 * Initialize eQuestionnaire configuration
 */
angular.module('equestionnaire', [
  'ngRoute',
  'ngAnimate',
  'equestionnaire.contact',
  'equestionnaire.contactlist',
  'equestionnaire.mailaccountsetting',
  'equestionnaire.questionnaire',
  'equestionnaire.survey'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/contacts/'});
}]);