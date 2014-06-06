'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contact')
	.controller('ContactCreateController', ['$scope', '$location', 'ContactResource', function ($scope, $location, ContactResource) { 
		$scope.title = 'Create contact';
		$scope.links = {
			back_to_list: '#/contacts/'
		};
		
		$scope.save = function (contact) {
			var newContact 		= new ContactResource();
		    newContact.name 	= contact.name;
		    newContact.email 	= contact.email;
		    newContact.$save(function (contact) {
		    	$location.path('/contacts/'+contact._id+'/detail/');
		    });
		};
	}]);