'use strict';


/**
 * Initialize Survey Service
 */
angular.module('equestionnaire.survey').factory('SurveyResource', ['$resource', function ($resource) {
    return $resource('api/surveys/:survey_id', {
        survey_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);