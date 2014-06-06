'use strict';


/**
 * Initialize Survey Service
 */
angular.module('equestionnaire.survey').factory('ContactListsResource', ['$resource', function ($resource) {
    return $resource('api/contact-lists/:contact_list_id', {
        contact_list_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);