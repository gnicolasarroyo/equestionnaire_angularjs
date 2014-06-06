'use strict';


/**
 * Initialize Contact List configuration
 */
angular.module('equestionnaire.contactlist', [
  'ngRoute',
  'ngResource'
])
.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when(
  		'/contact-lists/', 
		{ templateUrl: 'js/app/contact_list/partials/list.html', controller: 'ContactListListController' });
  	
    $routeProvider.when(
      '/contact-lists/:contact_list_id/detail/', 
      { templateUrl: 'js/app/contact_list/partials/show.html', controller: 'ContactListShowController' });
    
    $routeProvider.when(
  		'/contact-lists/new/', 
  		{ templateUrl: 'js/app/contact_list/partials/create.html', controller: 'ContactListCreateController' });
  	
    $routeProvider.when(
  		'/contact-lists/:contact_list_id/edit/', 
  		{ templateUrl: 'js/app/contact_list/partials/update.html', controller: 'ContactListUpdateController' });
  	
    $routeProvider.when(
  		'/contact-lists/:contact_list_id/delete/', 
  		{ templateUrl: 'js/app/contact_list/partials/delete.html', controller: 'ContactListDeleteController' });
}]);