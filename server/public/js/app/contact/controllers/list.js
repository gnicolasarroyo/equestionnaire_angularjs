'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contact')
	.controller('ContactListController', ['$scope', '$routeParams', 'ContactResource', function ($scope, $routeParams, ContactResource) { 
		$scope.title = 'List contact';
		$scope.links = {
			base_url: 	'#/contacts/',
			new: 		'#/contacts/new/'
		};

		ContactResource.query(function (contacts) {
			$scope.contacts = contacts;
			$scope.list_on 	= ($scope.contacts.length > 0);
		});
	}]);