angular.module('dylurp')
    .controller('DaftarJawapanPenilaian', [
        '$scope',
        '$uibModal',
        '$location',
        '$routeParams',
        'PenilaianLatihanModel',
        'JawapanModel',
        function($scope, $uibModal, $location, $routeParams, PenilaianLatihanModel, JawapanModel) {

            $scope.penilaianid = $routeParams.penilaianId;

            $scope.loadTemplate = function() {

                PenilaianLatihanModel.get({penilaian_id: $scope.penilaianid}, function(response) {

                    delete response.peserta;

                    $scope.form = response;
                    $scope.form.markah_penilaian_A = 0;
                    $scope.form.markah_penilaian_B = 0;
                    $scope.form.markah_penilaian_C = 0;
                    $scope.form.totalMarkah = 0;
                    $scope.form.peratusan = 0;
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

                    JawapanModel.get({}, function(response) {

                        console.log(response);

                        $scope.form.senaraiPenilaian = response.penilaian_latihan;
                        $scope.form.senaraiPencapaian = response.pencapaian_latihan;

                        _.each($scope.form.senaraiPenilaian, function(bahagian) {
                            _.each(bahagian.skop, function(aspek) {
                                aspek.jawapan = 0;
                            });
                        });

                        _.each($scope.form.senaraiPencapaian, function(bahagian) {
                            _.each(bahagian.skop, function(aspek) {
                                aspek.jawapanSebelum = 0;
                                aspek.jawapanSelepas = 0;
                            });
                        });

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

                var jawapan = new JawapanModel($scope.form);

                jawapan.$save({}, function(response) {

                    $location.path('training/' + $scope.penilaianid);

                }, function(error) {
                    console.error(error);
                });

            };

            $scope.loadTemplate();

        }]);