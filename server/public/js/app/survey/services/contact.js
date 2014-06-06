'use strict';


/**
 * Initialize Survey Service
 */
angular.module('equestionnaire.survey').factory('ContactResource', ['$resource', function ($resource) {
    return $resource('api/contacts/:contact_id', {
        contact_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);