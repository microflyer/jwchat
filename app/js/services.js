'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory("userManagerService", ["$rootScope", function($rootScope) {

    console.log("$rootScope.auth");
    console.log($rootScope.auth);

    return {
        createUser: function(email, password) {
            $rootScope.auth.$createUser(email, password, false).then(
                function(user){console.log("user="); console.log(user);}, 
                function(err){ console.log(err)}
            );
        }
    };
}]);
