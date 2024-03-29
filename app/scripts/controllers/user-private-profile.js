/**
 *
 * @module user-private-profile
 * @author Greg Babula [gbabula@gmail.com]
 * @description user private profile, content editor
 *
 * @todo cleanup, keep default chunk in an external file, add additional markdown tutorial, etc...
 *
 */

'use strict';


angular.module('cloudsqApp')
    .controller('UserPrivateProfileCtrl', function($rootScope, $scope, $location, User) {

        var defaultChunk = [
            '# Chunk Headline',
            '   \n',
            '   \n',
            '![Square in a Circle](http://upload.wikimedia.org/wikipedia/commons/2/2b/Straight_Square_Inscribed_in_a_Circle_240px.gif)',
            '   \n',
            '   \n',
            'This editor lets you create HTML by entering text in a simple format that\'s easy to read and write.',
            '   \n',
            '   \n',
            '[Learn Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)'
        ].join('');

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'active';

        $scope.user.chunks = $scope.user.chunks || [];

        $scope.user.chunk = {};
        $scope.user.chunk.setting = 'archive';
        $scope.user.chunk.content = defaultChunk;

        /**
         *
         * @function save
         *
         */
        $scope.save = function() {

            $scope.user.chunk.tstamp = +new Date();
            $scope.user.chunks.push($scope.user.chunk);

            User.update($scope.user, function() {
                $location.path('/user/' + $scope.user.username + '/');
            });

        };

        /**
         *
         * @function destroy
         *
         */
        // $scope.destroy = function() {

            // User.destroy($scope.user, function() {
                // $location.path('/');
            // });

        // };

    });
