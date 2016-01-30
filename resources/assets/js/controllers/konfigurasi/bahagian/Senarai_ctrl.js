angular.module('dylurp')
    .controller('SenaraiBahagian', ['$scope', '$uibModal', '$location', 'BahagianModel', function($scope, $uibModal, $location, BahagianModel) {

        $scope.qs = {};

        $scope.loadSenarai = function() {

            BahagianModel.query($scope.qs, function(response, responseHeader) {

                $scope.SenaraiBahagian = response;
                $scope.SenaraiInduk = _.reject(response, {'bahagian_id' : 1});

            }, function(error) {
                console.error(error);
            });

        };

        $scope.tambahBahagian = function() {

            $uibModal.open({
                    templateUrl: 'html/konfigurasi/bahagian/modal/bahagian.html',
                    controller: 'MaklumatBahagian',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        bahagian: function() {
                            return null;
                        },
                        senaraiInduk: function() {
                            return $scope.SenaraiInduk;
                        }
                    }
                })
                .result
                .then(function(response) {
                    $scope.loadSenarai();
                });

        };

        $scope.maklumatBahagian = function(bahagian) {

            $uibModal.open({
                    templateUrl: 'html/konfigurasi/bahagian/modal/bahagian.html',
                    controller: 'MaklumatBahagian',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        bahagian: function() {
                            return bahagian;
                        },
                        senaraiInduk: function() {
                            return $scope.SenaraiInduk;
                        }
                    }
                })
                .result
                .then(function(response) {
                    $scope.loadSenarai();
                });

        };

        $scope.loadSenarai();

    }]);