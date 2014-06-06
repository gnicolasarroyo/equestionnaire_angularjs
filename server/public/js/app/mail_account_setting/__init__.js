'use strict';


/**
 * Initialize Mail Account Setting configuration
 */
angular.module('equestionnaire.mailaccountsetting', [
  'ngRoute',
  'ngResource'
])
.config(['$routeProvider', function ($routeProvider) {
  	$routeProvider.when(
  		'/mail-account-settings/', 
		{ templateUrl: 'js/app/mail_account_setting/partials/list.html', controller: 'MailAccountSettingListController' });
  	
    $routeProvider.when(
      '/mail-account-settings/:mail_account_setting_id/detail/', 
      { templateUrl: 'js/app/mail_account_setting/partials/show.html', controller: 'MailAccountSettingShowController' });
    
    $routeProvider.when(
  		'/mail-account-settings/new/', 
  		{ templateUrl: 'js/app/mail_account_setting/partials/create.html', controller: 'MailAccountSettingCreateController' });
  	
    $routeProvider.when(
  		'/mail-account-settings/:mail_account_setting_id/edit/', 
  		{ templateUrl: 'js/app/mail_account_setting/partials/update.html', controller: 'MailAccountSettingUpdateController' });
  	
    $routeProvider.when(
  		'/mail-account-settings/:mail_account_setting_id/delete/', 
  		{ templateUrl: 'js/app/mail_account_setting/partials/delete.html', controller: 'MailAccountSettingDeleteController' });
}]);