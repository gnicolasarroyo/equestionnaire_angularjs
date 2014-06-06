'use strict';


/**
 * Initialize Contact List Service
 */
angular.module('equestionnaire.contactlist').factory('ContactListResource', ['$resource', function($resource) {
    return $resource('api/contact-lists/:contact_list_id', {
        contact_list_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);