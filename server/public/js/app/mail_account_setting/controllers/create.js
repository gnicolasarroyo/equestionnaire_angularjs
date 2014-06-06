'use strict';


/**
 * Initialize Mail Account Setting Controller
 */
angular.module('equestionnaire.mailaccountsetting')
	.controller('MailAccountSettingCreateController', ['$scope', '$location', 'MailAccountSettingResource', function ($scope, $location, MailAccountSettingResource) { 
		
		function initialize () {
			$scope.title = 'Create mail account setting';
			$scope.links = { back_to_list: '#/mail-account-settings/' };
		}
		
		$scope.save = function (mail_account_setting) {
			
			/* onSuccess */
			function onSuccess (data) {
				$location.path('/mail-account-settings/'+data._id+'/detail/');
			}

			/* onError */
			function onError (data) {
				console.log(data);
			}

			var newMailAccounSetting 		= new MailAccountSettingResource();
		    newMailAccounSetting.name 		= mail_account_setting.name;
		    newMailAccounSetting.host 		= mail_account_setting.host;
		    newMailAccounSetting.port 		= mail_account_setting.port;
		    newMailAccounSetting.username 	= mail_account_setting.username;
		    newMailAccounSetting.password 	= mail_account_setting.password;
		    
		    newMailAccounSetting.$save(onSuccess, onError);
		};

		initialize();
	}]);