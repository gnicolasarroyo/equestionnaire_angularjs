'use strict';


/**
 * Initialize Questionnaire Service
 */
angular.module('equestionnaire.questionnaire').factory('QuestionnaireResource', ['$resource', function ($resource) {
    return $resource('api/questionnaires/:questionnaire_id', {
        questionnaire_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);