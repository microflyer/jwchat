'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory("userManagerService", ["$rootScope", function($rootScope) {

    return {

        createUser: function(email, password) {
            return $rootScope.auth.$createUser(email, password, false);
        },

        login: function(email, password) {
            return $rootScope.auth.$login('password', {email: email, password: password});
        }
    };
}])
    .factory("")
;
