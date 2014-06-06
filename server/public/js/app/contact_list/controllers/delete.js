'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contactlist')
	.controller('ContactListDeleteController', ['$scope', '$location', '$routeParams', 'ContactListResource', function ($scope, $location, $routeParams, ContactListResource) { 
		$scope.title = 'Delete contact list';
		$scope.links = { back_to_list: '#/contact-lists/' };

		ContactListResource.get({ contact_list_id: $routeParams.contact_list_id }, function (contact_list) {
	    	$scope.contact_list = contact_list;
	    });

		$scope.delete = function (contact_list) {
			contact_list.$delete();
			$location.path('/contact-lists/');
		};
	}]);