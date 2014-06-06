'use strict';


/**
 * Initialize Mail Account Setting Controller
 */
angular.module('equestionnaire.mailaccountsetting')
	.controller('MailAccountSettingListController', ['$scope', '$routeParams', 'MailAccountSettingResource', function ($scope, $routeParams, MailAccountSettingResource) { 
		

		function initialize () {
			$scope.title = 'List mail account setting';
			$scope.links = {
				base_url: 	'#/mail-account-settings/',
				new: 		'#/mail-account-settings/new/'
			};


			function onSuccess (data) {
				$scope.mail_account_settings = data;
				$scope.list_on 	= (data.length > 0);
			}

			function onError (date) {
				console.log(data);
			} 

			MailAccountSettingResource.query(onSuccess, onError);
		}

		initialize();
	}]);