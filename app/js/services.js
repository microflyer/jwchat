'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .factory("userManagerService", ["$rootScope", 'FBURL', '$firebase',
        function ($rootScope, FBURL, $firebase) {

            return {
                createUser: function (email, password) {
                    return $rootScope.auth.$createUser(email, password, false);
                },

                login: function (email, password) {
                    return $rootScope.auth.$login('password', {
                        email: email,
                        password: password
                    });
                },

                createUserProfile: function (id, displayName, email) {
                    var ref = new Firebase(FBURL + 'users/' + id);
                    var usrObj = {
                        email: email,
                        name: displayName
                    }

                    $firebase(ref).$set(usrObj);
                }
            };
        }
    ])
    .factory("userService", ['FBURL', '$firebase', '$q',
        function (FBURL, $firebase, $q) {
            return {
                getUserRef: function (userId) {
                    var ref = new Firebase(FBURL + 'users/' + userId);
                    var userRef = $firebase(ref);

                    return userRef;
                },

                getUser: function (userId) {
                    var ref = new Firebase(FBURL + 'users/' + userId);
                    var userRef = $firebase(ref);
                    var deferred = $q.defer();

                    userRef.$on("loaded", function () {
                        var user = {
                            id: userId,
                            name: userRef.name,
                            email: userRef.email
                        };
                        deferred.resolve(user);
                    });

                    return deferred.promise;
                },

                getBuddyIds: function (userId, callback) {
                    var ref = new Firebase(FBURL + 'users/' + userId);
                    var userRef = $firebase(ref);
                    var deferred = $q.defer();

                    userRef.$on("change", function () {

                        console.log("Buddy Id Changed!");

                        var buddyIds = [];

                        if (userRef.buddies) {

                            angular.forEach(userRef.buddies, function (value, key) {
                                buddyIds.push(key);
                            });
                        }

                        deferred.resolve(buddyIds);

                        if (callback) {
                            callback(buddyIds);
                        };
                    });

                    return deferred.promise;
                },

                getAllUsers: function () {
                    var ref = new Firebase(FBURL + 'users');
                    var usersRef = $firebase(ref);
                    var deferred = $q.defer();

                    usersRef.$on('loaded', function () {
                        var users = [];
                        var userIds = usersRef.$getIndex();
                        angular.forEach(userIds, function (userId, index) {
                            users.push({
                                id: userId,
                                name: usersRef[userId].name,
                                email: usersRef[userId].email
                            });
                            deferred.resolve(users);
                        });
                    });

                    return deferred.promise;
                },

                addBuddy: function (userId, buddyId, channelId) {
                    var ref = new Firebase(FBURL + 'users/' + userId);
                    var userRef = $firebase(ref);
                    userRef.$child("buddies").$child(buddyId).$set(channelId);
                },

                removeBuddy: function (userId, buddyId) {
                    var ref = new Firebase(FBURL + 'users/' + userId);
                    var userRef = $firebase(ref);
                    userRef.$child("buddies").$remove(buddyId);
                    console.log("remove buddy");
                }
            };
        }
    ])
    .factory("chatService", ['FBURL', '$firebase', '$q', function(FBURL, $firebase, $q){
        return {
            createChannel: function(userId1, userId2) {
                var channelsRef = $firebase(new Firebase(FBURL + 'channels/'));

                var deferred = $q.defer();

                var datetime = (new Date()).toUTCString();
                var firstMsg = { senderId: userId1, text: "Now we can start talking to each other", sendDttm: datetime };

                channelsRef.$add({createrId: userId1}).then( function(ref) {

                    var channelId = ref.name();
                    var channelRef = $firebase(ref);

                    channelRef.$child("users").$child(userId1).$set(true);
                    channelRef.$child("users").$child(userId2).$set(true);

                    channelRef.$child("messages").$add(firstMsg).then(function(messageRef){
                        deferred.resolve(channelId);
                    });
                });

                return deferred.promise;
            },

            removeChannel: function(channelId) {
                var channelsRef = $firebase(new Firebase(FBURL + 'channels/'));
                channelsRef.$remove(channelId);
            },

            addMessage: function(channelId, senderId, text) {
                var channelRef = $firebase(new Firebase(FBURL + 'channels/' + channelId));

                var datetime = (new Date()).toUTCString();
                var msg = { senderId: senderId, text: text, sendDttm: datetime };

                channelRef.$(messages).$add(msg);
            }
        }

    }]);