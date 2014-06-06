'use strict';


/**
 * Initialize Mail Account Setting Service
 */
angular.module('equestionnaire.mailaccountsetting').factory('MailAccountSettingResource', ['$resource', function ($resource) {
    return $resource('api/mail-account-settings/:mail_account_setting_id', {
        mail_account_setting_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);