'use strict';


/**
 * Initialize Questionnaire configuration
 */
angular.module('equestionnaire.questionnaire', [
  'ngRoute',
  'ngResource'
])
.config(['$routeProvider', function($routeProvider) {
  	
    /* Questionnaire */

    // list
    $routeProvider.when(
  		'/questionnaires/', 
		{ templateUrl: 'js/app/questionnaire/partials/list.html', controller: 'QuestionnaireListController' });
  	
    // show
    $routeProvider.when(
      '/questionnaires/:questionnaire_id/detail/', 
      { templateUrl: 'js/app/questionnaire/partials/show.html', controller: 'QuestionnaireShowController' });
    
    // new
    $routeProvider.when(
  		'/questionnaires/new/', 
  		{ templateUrl: 'js/app/questionnaire/partials/create.html', controller: 'QuestionnaireCreateController' });
  	
    // update
    $routeProvider.when(
  		'/questionnaires/:questionnaire_id/edit/', 
  		{ templateUrl: 'js/app/questionnaire/partials/update.html', controller: 'QuestionnaireUpdateController' });
  	
    // delete
    $routeProvider.when(
  		'/questionnaires/:questionnaire_id/delete/', 
  		{ templateUrl: 'js/app/questionnaire/partials/delete.html', controller: 'QuestionnaireDeleteController' });

    /* Survey using questionnaire 

    // list
    $routeProvider.when(
      '/questionnaires/:questionnaire_id/surveys/', 
    { templateUrl: 'js/app/questionnaire/partials/list_survey.html', controller: 'QuestionnaireSurveyListController' });
    
    // show
    $routeProvider.when(
      '/questionnaires/:questionnaire_id/surveys/:survey_id/detail/', 
      { templateUrl: 'js/app/questionnaire/partials/show_survey.html', controller: 'QuestionnaireSurveyShowController' });

    // create
    $routeProvider.when(
      '/questionnaires/:questionnaire_id/surveys/new/', 
      { templateUrl: 'js/app/questionnaire/partials/create_survey.html', controller: 'QuestionnaireSurveyCreateController' });
    
    // update
    $routeProvider.when(
      '/questionnaires/:questionnaire_id/surveys/:survey_id/edit/', 
      { templateUrl: 'js/app/questionnaire/partials/update_survey.html', controller: 'QuestionnaireSurveyUpdateController' });
    
    // delete
    $routeProvider.when(
      '/questionnaires/:questionnaire_id/surveys/:survey_id/delete/', 
      { templateUrl: 'js/app/questionnaire/partials/delete_survey.html', controller: 'QuestionnaireSurveyDeleteController' });
*/
}]);