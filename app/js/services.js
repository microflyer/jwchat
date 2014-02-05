'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ["firebase"])
    .factory("userManagerService", ["$rootScope", 'FBURL', '$firebase', function($rootScope, FBURL, $firebase) {

        return {
            createUser: function(email, password) {
                return $rootScope.auth.$createUser(email, password, false);
            },

            login: function(email, password) {
                return $rootScope.auth.$login('password', {email: email, password: password});
            },

            createUserProfile: function(id, displayName, email) {
                var ref = new Firebase(FBURL + 'users/' + id);
                var usrObj = {email: email, name: displayName}

                $firebase(ref).$set(usrObj);
            }
        };
    }]);
