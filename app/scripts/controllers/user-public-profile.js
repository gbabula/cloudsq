/**
 * 
 * @module user-public-profile
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


angular.module('cloudsqApp')
    .controller('UserProfileCtrl', function($location, $rootScope, $scope, $routeParams, $window, Users) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'inactive';

        $scope.cloudSquareUser = Users.findByUsername($routeParams.cloudSquareUserName);

        // if user doesnt exist in 
        // main users list, redirect to home
        if (!$scope.cloudSquareUser) {

            $location.path('/');

        // user exists
        // initialize user profile
        } else {

            $rootScope.loading = false;
            $scope.profileInitialized = true;

        }


        // $scope.deleteChunk = function(id) {

            // // find current user and only 
            // // expose their chunks
            // var currentUser = Users.findByUsername($scope.user.username),
                // chunks = $scope.user.chunks;

            // // find chunk to be removed via the
            // // time stamp
            // var removeChunk = _.find(chunks, function(chunk) {
                // return chunk.tstamp === id;
            // });

            // // confirm that the user really wants to 
            // // delete this chunk
            // if ($window.confirm('Are you sure you want to delete this chunk?')) {
                // // remove chunk
                // chunks.splice([chunks.indexOf(removeChunk)], 1);
                // // update chunk array
                // currentUser.chunks = chunks;
                // // update project
                // $scope.csUser = new Project($scope.cloudSquareUser);
                // $scope.csUser.update(function() {
                    // console.log('csUser Updated');
                // });
            // }

        // };

    });
