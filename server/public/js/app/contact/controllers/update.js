'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contact')
	.controller('ContactUpdateController', ['$scope', '$location', '$routeParams', 'ContactResource', function ($scope, $location, $routeParams, ContactResource) { 
		$scope.title = 'Update contact';
		$scope.links = { back_to_list: '#/contacts/' };

		ContactResource.get({ contact_id: $routeParams.contact_id }, function (contact) {
	    	$scope.contact = contact;
	    });

		$scope.save = function (contact) {
			$scope.contact.$update(function (contact) {
				$location.path('/contacts/'+contact._id+'/detail/');
			});
		};
	}]);