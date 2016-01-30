angular.module('dylurp')
    .controller('DaftarPenilaianLatihan', [
        '$scope',
        '$modalInstance',
        function($scope, $modalInstance) {

            $scope.form = {
                tarikh: new Date()
            };

            $scope.datepicker = {
                opened:false
            };

            $scope.showDatePicker = function() {
                $scope.datepicker.opened = ($scope.datepicker.opened)? false : true;
            };

            $scope.dateOptions = {
                startingDay: 1
            };

            $scope.ok = function () {
                $modalInstance.close($scope.form);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);