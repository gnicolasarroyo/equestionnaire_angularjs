'use strict';


/**
 * Initialize Survey Service
 */
angular.module('equestionnaire.survey').factory('MailAccountSettingResource', ['$resource', function ($resource) {
    return $resource('api/mail-account-settings/:mail_account_setting_id', {
        mail_account_setting_id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);