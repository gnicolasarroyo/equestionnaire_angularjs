'use strict';


/**
 * Initialize Answer Service
 */
angular.module('equestionnaire.survey').factory('AnswerResource', ['$resource', function ($resource) {
    return $resource('api/answers/:survey_id', {
        survey_id: '@_id'
    });
}]);