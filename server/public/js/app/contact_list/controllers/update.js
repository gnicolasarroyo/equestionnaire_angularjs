'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contactlist')
	.controller('ContactListUpdateController', ['$scope', '$location', '$routeParams', 'ContactListResource', 'ContactResource', function ($scope, $location, $routeParams, ContactListResource, ContactResource) { 
		function initialize () {
			$scope.title = 'Update contact list';
			$scope.links = { back_to_list: '#/contact-lists/' };

			ContactResource.query(function (contacts) {
				$scope.avaible_list = contacts;

				ContactListResource.get({ contact_list_id: $routeParams.contact_list_id }, function (contact_list) {
					$scope.contact_list = contact_list;

					var temp_contacts = $scope.contact_list.contacts;
					$scope.contact_list.contacts = [];

					for (var i = $scope.avaible_list.length - 1; i >= 0; i--) {
					 	for (var j = temp_contacts.length - 1; j >= 0; j--) {
					 		if (temp_contacts[j]._id === $scope.avaible_list[i]._id) {
								swap($scope.avaible_list[i], $scope.avaible_list, $scope.contact_list.contacts);
								break;		 			
					 		}
					 	};
					};
				});
			});
			
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
		    contact_list.$update(function (contact_list) {
		    	$location.path('/contact-lists/'+contact_list._id+'/detail/');
		    });
		};


		initialize();
	}]);