'use strict';


/**
 * Initialize Survey configuration
 */
angular.module('equestionnaire.survey', [
  'ngRoute',
  'ngResource'
])
.config(['$routeProvider', function ($routeProvider) {
    
    /* Survey */

    // list
    $routeProvider.when(
  		'/surveys/', 
		{ templateUrl: 'js/app/survey/partials/list.html', controller: 'SurveyListController' });
  	
    // show
    $routeProvider.when(
      '/surveys/:survey_id/detail/', 
      { templateUrl: 'js/app/survey/partials/show.html', controller: 'SurveyShowController' });

    // create
    $routeProvider.when(
  		'/surveys/new/', 
  		{ templateUrl: 'js/app/survey/partials/create.html', controller: 'SurveyCreateController' });
  	
    // update
    $routeProvider.when(
  		'/surveys/:survey_id/edit/', 
  		{ templateUrl: 'js/app/survey/partials/update.html', controller: 'SurveyUpdateController' });
  	
    // delete
    $routeProvider.when(
  		'/surveys/:survey_id/delete/', 
  		{ templateUrl: 'js/app/survey/partials/delete.html', controller: 'SurveyDeleteController' });
}]);