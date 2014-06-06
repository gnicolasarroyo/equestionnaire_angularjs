'use strict';


/**
 * Initialize Contact configuration
 */
angular.module('equestionnaire.contact', [
  'ngRoute',
  'ngResource'
])
.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when(
  		'/contacts/', 
		{ templateUrl: 'js/app/contact/partials/list.html', controller: 'ContactListController' });
  	
    $routeProvider.when(
      '/contacts/:contact_id/detail/', 
      { templateUrl: 'js/app/contact/partials/show.html', controller: 'ContactShowController' });
    
    $routeProvider.when(
  		'/contacts/new/', 
  		{ templateUrl: 'js/app/contact/partials/create.html', controller: 'ContactCreateController' });
  	
    $routeProvider.when(
  		'/contacts/:contact_id/edit/', 
  		{ templateUrl: 'js/app/contact/partials/update.html', controller: 'ContactUpdateController' });
  	
    $routeProvider.when(
  		'/contacts/:contact_id/delete/', 
  		{ templateUrl: 'js/app/contact/partials/delete.html', controller: 'ContactDeleteController' });
}]);