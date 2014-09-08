/*

    Cloudsq

    directives/directives.js

*/


'use strict';


var directives = angular.module('cloudsqApp.directives', []);


directives.directive('markdown', function() {

    var converter = new Showdown.converter();

    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            console.log('link markdown');

            if (attributes.markdown) {
                scope.$watch(attributes.markdown, function(newVal) {
                    if (newVal !== undefined) {
                        var html = converter.makeHtml(newVal);
                        element.html(html);
                    }
                });
            } else {
                var html = converter.makeHtml(element.text());
                element.html(html);
            }
        }
    };

});

directives.directive('csEditor', function() {

    var directive = {
        restrict: 'A',
        replace: true,
        require: '?ngModel',
        transclude: true,
        templateUrl: '/views/partials/profile-content-tools.html',
        link: function(scope, element, attributes) {
            console.log('link csEditor', attributes);

            scope.change = function() {
                console.log('csEditor change');
            };
        }
    };

    return directive;

});

// directives.directive('csSquareVote', function() {

//     return function(scope, element, attributes) {
//         // console.log(scope, element, attributes);
//         angular.element(element).bind('click', function() {
//             var $this = angular.element(this);

//             console.log(attributes.squareVote);

//             $this.toggleClass('active');
//         });
//     };

// });

directives.directive('eventClass', function() {

    return function(scope, element, attributes) {
        angular.element(element).bind('click', function() {
            var $this = angular.element(this),
                $parent = $this.parent();

            $parent.addClass(attributes.eventClass);
        });
    };

});

directives.directive('scroll', function($window) {

    return function(scope, element, attrs) {
        angular.element($window).bind('scroll', function() {
            if (this.pageYOffset >= 100) {
                scope.boolChangeClass = true;
                console.log('Scrolled below header.');
            } else {
                scope.boolChangeClass = false;
                console.log('Header is in view.');
            }

            scope.$apply();
        });
    };

});
