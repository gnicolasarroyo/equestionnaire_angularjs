'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contact')
	.controller('ContactShowController', ['$scope', '$routeParams', 'ContactResource', function ($scope, $routeParams, ContactResource) { 
		$scope.title = 'Show contact';
		$scope.links = {
			base_url: 		'#/contacts/',
			back_to_list: 	'#/contacts/'
		};

		ContactResource.get({ contact_id: $routeParams.contact_id }, function (contact) {
	    	$scope.contact = contact;
	    });
	}]);