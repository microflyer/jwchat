'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory("userManagerService", ["$rootScope", function($rootScope) {

    return {

        createUser: function(email, password) {
            $rootScope.auth.$createUser(email, password, false).then(
                function(user) {
                    console.log("User was created successfully!");
                    console.log(user);
                }, 
                function(err) {
                    console.log("Error happens when creating user");
                    console.log(err);
                }
            );
        },

        login: function(email, passowrd) {
            $rootScope.auth.$login('password', {email: email, passowrd: passowrd}).then(
                function(user) {
                    console.log("User was login successfully!");
                    console.log(user);
                },
                function(err){
                    console.log("Error happens when login user");
                    console.log(err);
                }
            );
        }
    };
}]);
