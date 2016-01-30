angular.module('dylurp')
    .controller('MaklumatBahagian', ['$scope', '$modalInstance', '$uibModal', 'BahagianModel', 'bahagian', 'senaraiInduk', function($scope, $modalInstance, $uibModal, BahagianModel, bahagian, senaraiInduk) {

        $scope.err = {
            have: false,
            msg: ''
        };
        $scope.senaraiBahagian = senaraiInduk;

        if(bahagian == null) {
            $scope.form = {
                nama: '',
                induk: true
            };
        } else {
            $scope.form = bahagian;
            $scope.form.induk = (bahagian.bahagian_id == 0)? true : false;
        }

        $scope.removeError = function() {
            $scope.err.have = false;
            $scope.err.msg = '';
        };

        $scope.ok = function () {

            if($scope.form.id) {

                BahagianModel.update({bahagian_id: $scope.form.id}, $scope.form)
                    .$promise
                    .then(function(response) {

                        if(response.success) {
                            $modalInstance.close({success: true});
                        } else {
                            $scope.err.have = true;
                            $scope.err.msg = response.message.nama[0];
                        }

                    }, function(error) {
                        console.error(error);
                    });

            } else {

                var newBahagian = new BahagianModel($scope.form);
                newBahagian.$save({}, function(response) {

                    if(response.success) {
                        $modalInstance.close({success: true});
                    } else {
                        $scope.err.have = true;
                        $scope.err.msg = response.message.nama[0];
                    }

                }, function(error) {
                    console.error(error);
                });
            }
        };

        $scope.delete = function() {

            $uibModal.open({
                templateUrl: 'html/konfigurasi/bahagian/modal/padam.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.ok = function () {
                        $modalInstance.close({cont: true});
                    };

                    $scope.cancel = function () {
                        $modalInstance.close({cont: false});
                    };

                }],
                backdrop: 'static'
            })
            .result
            .then(function(response) {

                if(response.cont) {

                    BahagianModel.delete({bahagian_id: $scope.form.id}, function(response) {

                        $modalInstance.close({success: true});

                    }, function(error) {
                        console.error(error);
                    });

                }

            });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);