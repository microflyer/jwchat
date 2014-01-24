'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/createuser', {templateUrl: 'partials/create-user.html'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html'});
  $routeProvider.otherwise({redirectTo: '/home'});
}])
 // establish authentication
  .run(['$firebaseSimpleLogin', 'FBURL', '$rootScope', 
    function($firebaseSimpleLogin, FBURL, $rootScope) {

      var ref = new Firebase(FBURL);
      $rootScope.auth = $firebaseSimpleLogin(ref);

    }])
  .constant('FBURL', 'https://beyond-chat.firebaseio.com/')
