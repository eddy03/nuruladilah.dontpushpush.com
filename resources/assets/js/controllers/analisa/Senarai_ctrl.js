angular.module('dylurp')
    .controller('SenaraiAnalisaLatihan', [
        '$scope',
        '$uibModal',
        '$location',
        'AnalisaLatihanModel',
        function($scope, $uibModal, $location, AnalisaLatihanModel) {

            $scope.qs = {};

            $scope.loadSenarai = function() {

                AnalisaLatihanModel.query($scope.qs, function(response, responseHeader) {

                    $scope.SenaraiAnalisa = response;

                }, function(error) {
                    console.error(error);
                });

            };

            $scope.tambahAnalisa = function() {
                $location.path('analisa/baru');
            }

            //Bootup
            $scope.loadSenarai();

        }]);