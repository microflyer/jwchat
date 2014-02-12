'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
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
    }])
    .factory("userService", ['FBURL', '$firebase', '$q', function(FBURL, $firebase, $q) {
        return {
            getUserRef: function(userId) {
                var ref = new Firebase(FBURL + 'users/' + userId);
                var userRef = $firebase(ref);

                console.log(userRef);

                return userRef;

                /*
                var deferred = $q.defer();

                userRef.$on("loaded", function(user){
                    deferred.resolve(user)
                });

                return deferred.promise;
                */
            },
            
            getUsersRef: function() {
                var ref = new Firebase(FBURL + 'users');
                var usersRef = $firebase(ref);
                return usersRef;
            },

            addBuddy: function(userId, buddyId) {
                var ref = new Firebase(FBURL + 'users/' + userId);
                var userRef = $firebase(ref);
                userRef.$child("buddies").$set({buddyId:true});
            },

            removeBuddy: function(userId, buddyId) {

            }
        };
    }]);
