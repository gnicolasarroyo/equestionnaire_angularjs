'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contactlist')
	.controller('ContactListShowController', ['$scope', '$routeParams', 'ContactListResource', function ($scope, $routeParams, ContactListResource) { 
		$scope.title = 'Show contact list';
		$scope.links = {
			base_url: 		'#/contact-lists/',
			back_to_list: 	'#/contact-lists/'
		};

		ContactListResource.get({ contact_list_id: $routeParams.contact_list_id }, function (contact_list) {
	    	$scope.contact_list = contact_list;
	    });
	}]);