angular.module('dylurp')
    .controller('sidebarCtrl', ['$scope', '$location', function($scope, $location) {

        var locationObj = $location.path().split('/');
        $scope.currentURLFirst = locationObj[1];
        $scope.currentURLSecond = locationObj[2];

        $scope.$on('$locationChangeStart', function(event) {
            $scope.currentURLFirst = locationObj[1];
            $scope.currentURLSecond = locationObj[2];
        });

    }]);