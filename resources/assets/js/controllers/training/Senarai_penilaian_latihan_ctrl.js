angular.module('dylurp')
    .controller('SenaraiPenilaianLatihan', [
        '$scope',
        '$uibModal',
        '$location',
        'PenilaianLatihanModel',
        function($scope, $uibModal, $location, PenilaianLatihanModel) {

            $scope.qs = {};

            $scope.loadSenarai = function() {

                PenilaianLatihanModel.query($scope.qs, function(response, responseHeader) {

                    $scope.SenaraiPenilaianLatihan = response;

                }, function(error) {
                    console.error(error);
                });

            }

            $scope.tambahPenilaian = function() {

                $uibModal.open({
                    templateUrl: 'html/training/modal/daftar_penilaian_latihan.html',
                    controller: 'DaftarPenilaianLatihan',
                    size: 'lg',
                    backdrop: 'static'
                })
                    .result
                    .then(function(response) {

                        var newPenilaian = new PenilaianLatihanModel(response);

                        newPenilaian.$save({}, function(response) {

                            $location.path('training/' + response.id);

                        }, function(error) {
                            console.error(error);
                        });

                    });

            }

            $scope.viewPenilaian = function(id) {
                $location.path('training/' + id);
            }

            //Bootup
            $scope.loadSenarai();

        }]);