'use strict';


/**
 * Initialize Contact List Controller
 */
angular.module('equestionnaire.contactlist')
	.controller('ContactListListController', ['$scope', '$routeParams', 'ContactListResource', function ($scope, $routeParams, ContactListResource) { 
		$scope.title = 'List contact lists';
		$scope.links = {
			base_url: 	'#/contact-lists/',
			new: 		'#/contact-lists/new/'
		};

		ContactListResource.query(function (contact_lists) {
			$scope.contact_lists = contact_lists;
			$scope.list_on 	= ($scope.contact_lists.length > 0);
		});
	}]);