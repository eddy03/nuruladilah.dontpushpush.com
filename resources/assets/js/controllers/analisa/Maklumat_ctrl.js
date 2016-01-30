angular.module('dylurp')
    .controller('MaklumatAnalisaLatihan', [
        '$scope',
        '$uibModal',
        '$location',
        '$http',
        '$routeParams',
        'AnalisaLatihanModel',
        'BahagianModel',
        function($scope, $uibModal, $location, $http, $routeParams, AnalisaLatihanModel, BahagianModel) {

            if($routeParams.analisaId && isNaN($routeParams.analisaId)) {
                $location.path('404');
            }

            var params = {'analisa_id': $routeParams.analisaId};

            $scope.form = {
                anggota: {
                    bahagian: ''
                },
                kompetensi: {},
                bahagianA: {},
                bahagianB: {}
            };

            $scope.info = {
                class: 'danger',
                show: false,
                msg: '',
                closeAlert: function() {
                    $scope.info.show = false;
                }
            };

            if($routeParams.analisaId) {
                $scope.content = {
                    header: 'Maklumat analisa',
                    breadcrumb: 'Maklumat analisa',
                    breadcrumbBefore: [{"url": "analisa", "label": "Senarai Analisa"}]
                };
            } else {
                $scope.content = {
                    header: 'Tambah maklumat analisa baru',
                    breadcrumb: 'Tambah analisa baru',
                    breadcrumbBefore: [{"url": "analisa", "label": "Senarai Analisa"}]
                };
            }

            $scope.saveAnalisa = function() {

                if($routeParams.analisaId) {

                    AnalisaLatihanModel.update(params, $scope.form)
                        .$promise
                        .then(function(response) {

                            if(response.success) {
                                $scope.info.show = true;
                                $scope.info.class = 'success';
                                $scope.info.msg = 'Maklumat analisa telah dikemaskini';
                            } else {
                                $scope.info.show = true;
                                $scope.info.class = 'danger';
                                $scope.info.msg = 'Terdapat masalah sewaktu mengemaskini maklumat analisa';
                            }

                        }, function(error) {
                            console.error(error);
                        });

                } else {
                    var analisa = new AnalisaLatihanModel($scope.form);

                    analisa.$save({}, function(response) {
                        $location.path('/analisa');
                    }, function(error) {
                        console.error(error);
                    });
                }
            };

            $scope.deleteAnalisa = function() {

                $uibModal.open({
                    templateUrl: 'deleteAnalisa.html',
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

                        AnalisaLatihanModel.delete(params, function(response) {
                            $location.path('/analisa');
                        }, function(error) {
                            console.error(error);
                        });

                    }

                });

            };

            (function() {

                BahagianModel.query({}, function(response) {
                    $scope.senaraiBahagian = response;
                }, function(error) {
                    console.error(error);
                });

            })();

            (function() {

                $http.get('API/v1/latihan/analisa/soalan', {})
                    .then(function(results) {
                        $scope.form.kompetensi = results.data.soalanKompetensi;
                        $scope.form.bahagianA = results.data.soalanBhgA;
                        $scope.form.bahagianB = results.data.soalanBhgB;

                        if($routeParams.analisaId) {

                            AnalisaLatihanModel.get(params, function(response) {

                                $scope.form.anggota = {
                                    id: response.id,
                                    nama: response.nama,
                                    bahagian: response.bahagian_id,
                                    siri: response.siri,
                                    jawatan: response.jawatan
                                };

                                _.each($scope.form.kompetensi, function(kompetensi) {
                                    var jawapan = _.reject(response.jawapan_kompetensi, function(o) { return o.soalan_kompetensi_id != kompetensi.id });

                                    kompetensi.kebolehan = {};
                                    kompetensi.keperluan = {};

                                    kompetensi.kebolehan.anda = _.find(jawapan, {'diri_sendiri' : 1, 'jenis_penilaian' : 1}).jawapan;
                                    kompetensi.kebolehan.jawapanAndaId = _.find(jawapan, {'diri_sendiri' : 1, 'jenis_penilaian' : 1}).id;
                                    kompetensi.kebolehan.penyelia = _.find(jawapan, {'diri_sendiri' : 0, 'jenis_penilaian' : 1}).jawapan;
                                    kompetensi.kebolehan.jawapanPenyeliaId = _.find(jawapan, {'diri_sendiri' : 0, 'jenis_penilaian' : 1}).id;
                                    kompetensi.keperluan.anda = _.find(jawapan, {'diri_sendiri' : 1, 'jenis_penilaian' : 2}).jawapan;
                                    kompetensi.keperluan.jawapanAndaId = _.find(jawapan, {'diri_sendiri' : 1, 'jenis_penilaian' : 2}).id;
                                    kompetensi.keperluan.penyelia = _.find(jawapan, {'diri_sendiri' : 0, 'jenis_penilaian' : 2}).jawapan;
                                    kompetensi.keperluan.jawapanPenyeliaId = _.find(jawapan, {'diri_sendiri' : 0, 'jenis_penilaian' : 2}).id;
                                });

                                _.each($scope.form.bahagianA, function(bhgA) {
                                    var jawapan = _.find(response.jawapan_bhg_a, {soalan_analisa_bhg_a_id: bhgA.id});
                                    if(jawapan) {
                                        bhgA.jawapan = jawapan.jawapan;
                                        bhgA.jawapanId = jawapan.id;
                                    } else {
                                        _.each(bhgA.set_jawapan, function(setJawapan) {
                                            var jawapancheckbox = _.find(response.jawapan_bhg_a, {set_jawapan_soalan_analisa_bhg_a_id: setJawapan.id});
                                            setJawapan.answer = (jawapancheckbox.jawapan)? true : false;
                                            setJawapan.answerId = jawapancheckbox.id;
                                        });
                                    }
                                });

                                _.each($scope.form.bahagianB, function(bhgB) {
                                    _.each(bhgB.kursus, function(kursus) {
                                        var jawapan = _.find(response.jawapan_bhg_b, {analisa_kursus_bahagian_b_id: kursus.id});
                                        kursus.jawapan = jawapan.jawapan;
                                        bhgB.cadangan = jawapan.cadangan;
                                        kursus.jawapanId = jawapan.id;
                                    });
                                });

                            }, function(error) {
                                console.error(error);
                            });

                        }

                    }, function(error) {
                        console.error(error);
                    })

            })();

        }]);