'use strict';


/**
 * Initialize Survey Service
 */
angular.module('equestionnaire.survey').factory('QuestionnaireResource', ['$resource', function ($resource) {
    return $resource('api/questionnaires/:questionnaire_id', {
        questionnaire_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);