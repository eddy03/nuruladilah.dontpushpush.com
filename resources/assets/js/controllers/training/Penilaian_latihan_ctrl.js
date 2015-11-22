angular.module('dylurp')
    .controller('PenilaianLatihan', [
        '$scope',
        '$uibModal',
        '$location',
        '$routeParams',
        'PenilaianLatihanModel',
        function($scope, $uibModal, $location, $routeParams, PenilaianLatihanModel) {

            $scope.penilaianid = $routeParams.penilaianId;

            //DatePicker Options and setting
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.status = {
                opened: false
            };
            $scope.opendatepicker = function() {
                $scope.status.opened = true;
            };
            //End datepicker options and setting

            //Update penilaian latihan
            $scope.updateLatihan = function() {

                PenilaianLatihanModel.update({penilaian_id: $scope.penilaianid}, $scope.penilaianLatihan)
                    .$promise
                    .then(function(response) {
                        //Do nothing
                    }, function(error) {
                        console.error(error);
                    });

            }

            //Maklumat penilaian latihan serta peserta
            $scope.loadSenaraiPeserta = function() {

                PenilaianLatihanModel.get({penilaian_id: $scope.penilaianid}, function(response) {

                    $scope.penilaianLatihan = response;

                    $scope.totalMarkah = 0;
                    $scope.totalMarkahSebelum = 0;
                    $scope.totalMarkahSelepas = 0;
                    $scope.jumlahKeseluruhanMarkah = $scope.penilaianLatihan.peserta.length * 50;

                    //execute charts
                    executeStatsForBahagian1();
                    executeStatsForBahagian3();

                }, function(error) {
                    console.error(error);
                });

            };

            //Bootstrap
            $scope.loadSenaraiPeserta();

            var executeStatsForBahagian1 = function() {

                var cemerlang = 0,
                    baik = 0,
                    memuaskan = 0,
                    sederhana = 0,
                    lemah = 0;

                _.each($scope.penilaianLatihan.peserta, function(peserta) {
                    var total = peserta.markah_penilaian_A + peserta.markah_penilaian_B + peserta.markah_penilaian_C;
                    var totalForChartLogic = total / 50 * 100;

                    $scope.totalMarkah = $scope.totalMarkah + total;

                    if(totalForChartLogic >= 90) {
                        cemerlang++;
                    }
                    else if(totalForChartLogic >= 80 && totalForChartLogic <= 89) {
                        baik++;
                    }
                    else if(totalForChartLogic >= 70 && totalForChartLogic <= 79) {
                        memuaskan++;
                    }
                    else if(totalForChartLogic >= 60 && totalForChartLogic <= 69) {
                        sederhana++;
                    }
                    else if(totalForChartLogic <= 60) {
                        lemah++;
                    }
                });

                $(function () {
                    $('#chart').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: $scope.penilaianLatihan.tajuk
                        },
                        subtitle: {
                            text: 'Bilangan Peserta : ' + $scope.penilaianLatihan.peserta.length
                        },
                        xAxis: {
                            categories: ['Keputusan']
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Bil. Peserta'
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: 0,
                            y: 100
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '90 - 100 (Cemerlang)',
                            data: [cemerlang]
                        }, {
                            name: '80 - 89 (Baik)',
                            data: [baik]
                        }, {
                            name: '70 - 79 (Memuaskan)',
                            data: [memuaskan]
                        }, {
                            name: '60 - 69 (Sederhana)',
                            data: [sederhana]
                        }, {
                            name: '<60 (Lemah)',
                            data: [lemah]
                        }]
                    });
                });

            }

            var executeStatsForBahagian3 = function() {

                var sebelum = {
                    cemerlang: 0,
                    baik: 0,
                    memuaskan: 0,
                    sederhana: 0,
                    lemah: 0
                };

                var selepas = {
                    cemerlang: 0,
                    baik: 0,
                    memuaskan: 0,
                    sederhana: 0,
                    lemah: 0
                }

                _.each($scope.penilaianLatihan.peserta, function(peserta) {

                    var totalSebelum = peserta.markah_pencapaian_A_sebelum + peserta.markah_pencapaian_B_sebelum + peserta.markah_pencapaian_C_sebelum;
                    var totalSelepas = peserta.markah_pencapaian_A_selepas + peserta.markah_pencapaian_B_selepas + peserta.markah_pencapaian_C_selepas;
                    var totalForChartLogicSebelum = totalSebelum / 50 * 100;
                    var totalForChartLogicSelepas = totalSelepas / 50 * 100;

                    $scope.totalMarkahSebelum = $scope.totalMarkahSebelum + totalSebelum;
                    $scope.totalMarkahSelepas = $scope.totalMarkahSelepas + totalSelepas;

                    //Statistik Sebelum
                    if(totalForChartLogicSebelum >= 90) {
                        sebelum.cemerlang++;
                    }
                    else if(totalForChartLogicSebelum >= 80 && totalForChartLogicSebelum <= 89) {
                        sebelum.baik++;
                    }
                    else if(totalForChartLogicSebelum >= 70 && totalForChartLogicSebelum <= 79) {
                        sebelum.memuaskan++;
                    }
                    else if(totalForChartLogicSebelum >= 60 && totalForChartLogicSebelum <= 69) {
                        sebelum.sederhana++;
                    }
                    else if(totalForChartLogicSebelum <= 60) {
                        sebelum.lemah++;
                    }

                    //Statistik Selepas
                    if(totalForChartLogicSelepas >= 90) {
                        selepas.cemerlang++;
                    }
                    else if(totalForChartLogicSelepas >= 80 && totalForChartLogicSelepas <= 89) {
                        selepas.baik++;
                    }
                    else if(totalForChartLogicSelepas >= 70 && totalForChartLogicSelepas <= 79) {
                        selepas.memuaskan++;
                    }
                    else if(totalForChartLogicSelepas >= 60 && totalForChartLogicSelepas <= 69) {
                        selepas.sederhana++;
                    }
                    else if(totalForChartLogicSelepas <= 60) {
                        selepas.lemah++;
                    }
                });

                $(function () {
                    $('#chart2').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: $scope.penilaianLatihan.tajuk
                        },
                        subtitle: {
                            text: 'Bilangan Peserta : ' + $scope.penilaianLatihan.peserta.length
                        },
                        xAxis: {
                            categories: ['Sebelum', 'Selepas']
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Bil. Peserta'
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: 0,
                            y: 100
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '90 - 100 (Cemerlang)',
                            data: [sebelum.cemerlang, selepas.cemerlang]
                        }, {
                            name: '80 - 89 (Baik)',
                            data: [sebelum.baik, selepas.baik]
                        }, {
                            name: '70 - 79 (Memuaskan)',
                            data: [sebelum.memuaskan, selepas.memuaskan]
                        }, {
                            name: '60 - 69 (Sederhana)',
                            data: [sebelum.sederhana, selepas.sederhana]
                        }, {
                            name: '<60 (Lemah)',
                            data: [sebelum.lemah, selepas.lemah]
                        }]
                    });
                });

            }

        }]);