'use strict';


/**
 * Initialize Contact Service
 */
angular.module('equestionnaire.contactlist').factory('ContactResource', ['$resource', function($resource) {
    return $resource('api/contacts/:contact_id', {
        contact_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);