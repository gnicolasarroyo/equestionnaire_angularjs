'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contact')
	.controller('ContactDeleteController', ['$scope', '$location', '$routeParams', 'ContactResource', function ($scope, $location, $routeParams, ContactResource) { 
		$scope.title = 'Delete contact';
		$scope.links = {
			back_to_list: '#/contacts/'
		};

		ContactResource.get({ contact_id: $routeParams.contact_id }, function (contact) {
	    	$scope.contact = contact;
	    });

		$scope.delete = function (contact) {
			$scope.contact.$delete();
			$location.path('/contacts/');
		};
	}]);