'use strict';


/**
 * Initialize Contact Controller
 */
angular.module('equestionnaire.contactlist')
	.controller('ContactListUpdateController', ['$scope', '$location', '$routeParams', 'ContactListResource', 'ContactResource', function ($scope, $location, $routeParams, ContactListResource, ContactResource) { 
		function initialize () {
			$scope.title = 'Update contact list';
			$scope.links = { back_to_list: '#/contact-lists/' };
			$scope.available_list_on = false;

			/* onSuccess */			
			function onSuccess (data) {

				$scope.available_list_on = data.length > 0 ? true : false;

				$scope.available_list = data;

				/* onSuccess */
				function onSuccess (data) {
					var temp_contacts;

					$scope.contact_list = data;
					temp_contacts = $scope.contact_list.contacts;
					$scope.contact_list.contacts = [];

					for (var i = $scope.available_list.length - 1; i >= 0; i--) {
					 	for (var j = temp_contacts.length - 1; j >= 0; j--) {
					 		if (temp_contacts[j]._id === $scope.available_list[i]._id) {
								swap($scope.available_list[i], $scope.available_list, $scope.contact_list.contacts);
								break;		 			
					 		}
					 	};
					};
				}

				/* onError */
				function onError (data) {
					console.log(data);
				}

				/* get Contact List */
				ContactListResource.get({ contact_list_id: $routeParams.contact_list_id }, onSuccess, onError);
			}

			/* onError */
			function onError (data) {
				console.log(data);
			}

			/* get Contacts */
			ContactResource.query(onSuccess, onError);
		}
		
		function swap (item, from, to) {
			to.push(item);
			from.splice(from.indexOf(item),1);
		}

		$scope.avaibleCheck = function (item) {
			swap(item, $scope.available_list, $scope.contact_list.contacts);
		};

		$scope.selectedCheck = function (item) {
			swap(item, $scope.contact_list.contacts, $scope.available_list);
		};


		$scope.save = function (contact_list) {
		    contact_list.$update(function (contact_list) {
		    	$location.path('/contact-lists/'+contact_list._id+'/detail/');
		    });
		};


		initialize();
	}]);