angular.module('dylurp')
    .controller('DaftarPenilaianLatihan', [
        '$scope',
        '$modalInstance',
        function($scope, $modalInstance) {

            $scope.form = {
                tarikh: new Date()
            };

            $scope.ok = function () {
                $modalInstance.close($scope.form);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);