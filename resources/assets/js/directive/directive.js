angular.module('dylurp')
    .directive('breadcrumb', function() {
        return {
            restrict: 'A',
            templateUrl: 'html/directive/breadcrumb.html',
            link: function(scope, element, attributes){

                scope.previousmenu = (attributes.previousmenu == undefined || attributes.previousmenu == '')? [] : JSON.parse(attributes.previousmenu);
                scope.currentmenu = attributes.currentmenu;

            }
        }
    });