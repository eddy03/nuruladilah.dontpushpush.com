angular.module('dylurp')
    .controller('JawapanPenilaian', [
        '$scope',
        '$uibModal',
        '$location',
        '$routeParams',
        'PenilaianLatihanModel',
        'JawapanModel',
        function($scope, $uibModal, $location, $routeParams, PenilaianLatihanModel, JawapanModel) {

            $scope.penilaianid = $routeParams.penilaianId;
            $scope.pesertaid = $routeParams.pesertaId;

            $scope.loadTemplate = function() {

                JawapanModel.get({peserta_id: $scope.pesertaid}, function(response) {

                    $scope.form = response.penilaian_latihan;
                    $scope.form.nama = response.nama;
                    $scope.form.peserta_id = response.id;
                    $scope.namaPeserta = angular.copy($scope.form.nama);

                    JawapanModel.get({}, function(templateObj) {

                        $scope.form.senaraiPenilaian = templateObj.penilaian_latihan;
                        $scope.form.senaraiPencapaian = templateObj.pencapaian_latihan;

                        _.each($scope.form.senaraiPenilaian, function(bahagian) {
                            _.each(bahagian.skop, function(aspek) {
                                var jawapanaspek = _.find(response.jawapan_penilaian_peserta, {skop_penilaian_latihan_id: aspek.id});
                                aspek.jawapan_id = jawapanaspek.id;
                                aspek.jawapan = jawapanaspek.jawapan;
                            });
                        });

                        _.each($scope.form.senaraiPencapaian, function(bahagian) {
                            _.each(bahagian.skop, function(aspek) {
                                var jawapanSebelum = _.find(response.jawapan_pencapaian_sebelum, {skop_pencapaian_latihan_id: aspek.id});
                                var jawapanSelepas = _.find(response.jawapan_pencapaian_selepas, {skop_pencapaian_latihan_id: aspek.id});
                                aspek.jawapanSebelum_id = jawapanSebelum.id;
                                aspek.jawapanSebelum = jawapanSebelum.jawapan;
                                aspek.jawapanSelepas_id = jawapanSelepas.id;
                                aspek.jawapanSelepas = jawapanSelepas.jawapan;
                            });
                        });

                        $scope.recalculate();
                        $scope.recalculate2();

                    }, function(error) {
                        console.error(error);
                    });

                }, function(error) {
                    console.error(error);
                });
            };

            $scope.recalculate = function() {

                $scope.form.markah_penilaian_A = 0;
                $scope.form.markah_penilaian_B = 0;
                $scope.form.markah_penilaian_C = 0;
                $scope.form.totalMarkah = 0;
                $scope.form.peratusan = 0;

                _.each($scope.form.senaraiPenilaian, function(bahagian) {
                    _.each(bahagian.skop, function(aspek) {
                        if(bahagian.id == 1) {
                            $scope.form.markah_penilaian_A = $scope.form.markah_penilaian_A + parseInt(aspek.jawapan);
                        }
                        else if(bahagian.id == 2) {
                            $scope.form.markah_penilaian_B = $scope.form.markah_penilaian_B + parseInt(aspek.jawapan);
                        }
                        else if(bahagian.id == 3) {
                            $scope.form.markah_penilaian_C = $scope.form.markah_penilaian_C + parseInt(aspek.jawapan);
                        }
                    });
                });

                $scope.form.totalMarkah = $scope.form.markah_penilaian_A + $scope.form.markah_penilaian_B + $scope.form.markah_penilaian_C;
                $scope.form.peratusan = $scope.form.totalMarkah * 100 / 50;
            };

            $scope.recalculate2 = function() {

                $scope.form.markah_pencapaian_A_sebelum = 0;
                $scope.form.markah_pencapaian_B_sebelum = 0;
                $scope.form.markah_pencapaian_C_sebelum = 0;
                $scope.form.markah_pencapaian_A_selepas = 0;
                $scope.form.markah_pencapaian_B_selepas = 0;
                $scope.form.markah_pencapaian_C_selepas = 0;
                $scope.form.totalMarkah_pencapaian_sebelum = 0;
                $scope.form.totalMarkah_pencapaian_selepas = 0;
                $scope.form.peratusan_pencapaian_sebelum = 0;
                $scope.form.peratusan_pencapaian_selepas = 0;

                _.each($scope.form.senaraiPencapaian, function(bahagian) {
                    _.each(bahagian.skop, function(aspek) {
                        if(bahagian.id == 1) {
                            $scope.form.markah_pencapaian_A_sebelum = $scope.form.markah_pencapaian_A_sebelum + parseInt(aspek.jawapanSebelum);
                            $scope.form.markah_pencapaian_A_selepas = $scope.form.markah_pencapaian_A_selepas + parseInt(aspek.jawapanSelepas);
                        }
                        else if(bahagian.id == 2) {
                            $scope.form.markah_pencapaian_B_sebelum = $scope.form.markah_pencapaian_B_sebelum + parseInt(aspek.jawapanSebelum);
                            $scope.form.markah_pencapaian_B_selepas = $scope.form.markah_pencapaian_B_selepas + parseInt(aspek.jawapanSelepas);
                        }
                        else if(bahagian.id == 3) {
                            $scope.form.markah_pencapaian_C_sebelum = $scope.form.markah_pencapaian_C_sebelum + parseInt(aspek.jawapanSebelum);
                            $scope.form.markah_pencapaian_C_selepas = $scope.form.markah_pencapaian_C_selepas + parseInt(aspek.jawapanSelepas);
                        }
                    });
                });

                $scope.form.totalMarkah_pencapaian_sebelum = $scope.form.markah_pencapaian_A_sebelum + $scope.form.markah_pencapaian_B_sebelum + $scope.form.markah_pencapaian_C_sebelum;
                $scope.form.totalMarkah_pencapaian_selepas = $scope.form.markah_pencapaian_A_selepas + $scope.form.markah_pencapaian_B_selepas + $scope.form.markah_pencapaian_C_selepas;

                $scope.form.peratusan_pencapaian_sebelum = $scope.form.totalMarkah_pencapaian_sebelum * 100 / 50;
                $scope.form.peratusan_pencapaian_selepas = $scope.form.totalMarkah_pencapaian_selepas * 100 / 50;

            };

            $scope.simpan = function() {

                JawapanModel.update({peserta_id: $scope.pesertaid}, $scope.form)
                    .$promise
                    .then(function(response) {

                        $scope.loadTemplate();

                    }, function(error) {
                        console.error(error);
                    });

            };

            $scope.padam = function() {

                $uibModal.open({
                    templateUrl: 'html/training/modal/padam_jawapan.html',
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

                            JawapanModel.delete({peserta_id: $scope.pesertaid}, function(response) {

                                $location.path('training/' + $scope.penilaianid);

                            }, function(error) {
                                console.error(error);
                            });

                        }

                    });

            }

            $scope.loadTemplate();

        }]);