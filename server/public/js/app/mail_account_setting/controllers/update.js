'use strict';


/**
 * Initialize Mail Account Setting Controller
 */
angular.module('equestionnaire.mailaccountsetting')
	.controller('MailAccountSettingUpdateController', ['$scope', '$location', '$routeParams', 'MailAccountSettingResource', function ($scope, $location, $routeParams, MailAccountSettingResource) { 
		
		function initialize () {
			$scope.title = 'Update mail account setting';
			$scope.links = { back_to_list: '#/mail-account-settings/' };

			function onSuccess (data) {
		    	$scope.mail_account_setting = data;
			}

			function onError (data) {
				console.log(data);	
			}

			MailAccountSettingResource.get({ mail_account_setting_id: $routeParams.mail_account_setting_id }, onSuccess, onError);	
		}
		
		$scope.save = function (mail_account_setting) {
			
			function onSuccess (data) {
				$location.path('/mail-account-settings/'+data._id+'/detail/');
			}

			function onError (data) {
				console.log(data);
			}

			mail_account_setting.$update(onSuccess, onError);
		};

		initialize();
	}]);