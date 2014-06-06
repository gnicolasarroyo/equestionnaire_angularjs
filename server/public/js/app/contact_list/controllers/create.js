'use strict';


/**
 * Initialize Contact List Controller
 */
angular.module('equestionnaire.contactlist')
	.controller('ContactListCreateController', ['$scope', '$location', 'ContactListResource', 'ContactResource', function ($scope, $location, ContactListResource, ContactResource) { 
		
		function initialize () {
			$scope.title = 'Create contact list';
			$scope.links = { back_to_list: '#/contact-lists/' };

			ContactResource.query(function (contacts) {
				$scope.avaible_list = contacts;
			});

			$scope.contact_list = {
				name: '',
				contacts: []
			};
		}
		
		function swap (item, from, to) {
			to.push(item);
			from.splice(from.indexOf(item),1);
		}

		$scope.avaibleCheck = function (item) {
			swap(item, $scope.avaible_list, $scope.contact_list.contacts);
		};

		$scope.selectedCheck = function (item) {
			swap(item, $scope.contact_list.contacts, $scope.avaible_list);
		};


		$scope.save = function (contact_list) {
			var newContactList 		= new ContactListResource();
		    newContactList.name 	= contact_list.name;
		    newContactList.contacts = contact_list.contacts;

		    newContactList.$save(function (contact_list) {
		    	$location.path('/contact-lists/'+contact_list._id+'/detail/');
		    });
		};


		initialize();
	}]);