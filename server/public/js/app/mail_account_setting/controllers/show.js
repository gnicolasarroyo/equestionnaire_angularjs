'use strict';


/**
 * Initialize MailAccountSetting Controller
 */
angular.module('equestionnaire.mailaccountsetting')
	.controller('MailAccountSettingShowController', ['$scope', '$routeParams', 'MailAccountSettingResource', function ($scope, $routeParams, MailAccountSettingResource) { 
		
		function initialize() {
			$scope.title = 'Show mail account setting';
			$scope.links = {
				base_url: 		'#/mail-account-settings/',
				back_to_list: 	'#/mail-account-settings/'
			};	

			function onSuccess (data) {
				$scope.mail_account_setting = data;
			}

			function onError (data) {
				console.log(data);
			}

			MailAccountSettingResource.get({ mail_account_setting_id: $routeParams.mail_account_setting_id }, onSuccess, onError);
		}
		
		initialize();
	}]);