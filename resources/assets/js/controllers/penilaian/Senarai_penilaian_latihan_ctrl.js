angular.module('dylurp')
    .controller('SenaraiPenilaianLatihan', [
        '$scope',
        '$uibModal',
        '$location',
        'blockUI',
        'PenilaianLatihanModel',
        function($scope, $uibModal, $location, blockUI, PenilaianLatihanModel) {

            $scope.qs = {};

            $scope.loadSenarai = function() {

                PenilaianLatihanModel.query($scope.qs, function(response, responseHeader) {

                    $scope.SenaraiPenilaianLatihan = response;

                }, function(error) {
                    console.error(error);
                });

            };

            $scope.tambahPenilaian = function() {

                $uibModal.open({
                    templateUrl: 'html/penilaian/modal/daftar_penilaian_latihan.html',
                    controller: 'DaftarPenilaianLatihan',
                    size: 'lg',
                    backdrop: 'static'
                })
                    .result
                    .then(function(response) {

                        var newPenilaian = new PenilaianLatihanModel(response);

                        newPenilaian.$save({}, function(response) {

                            $location.path('penilaian/' + response.id);

                        }, function(error) {
                            console.error(error);
                        });

                    });

            }

            //Bootup
            $scope.loadSenarai();

        }]);