angular.module('dylurp')
    .controller('sidebarCtrl', ['$scope', '$location', function($scope, $location) {

        $scope.$on('$locationChangeStart', function(event) {
            var locationObj = $location.path().split('/');
            $scope.currentURLFirst = locationObj[1];
            $scope.currentURLSecond = locationObj[2];
        });

    }]);