angular.module('dylurp')
    .controller('PenilaianLatihan', [
        '$scope',
        '$uibModal',
        '$location',
        '$routeParams',
        'PenilaianLatihanModel',
        function($scope, $uibModal, $location, $routeParams, PenilaianLatihanModel) {

            $scope.penilaianid = $routeParams.penilaianId;

            $scope.loadSenaraiPeserta = function() {

                PenilaianLatihanModel.get({penilaian_id: $scope.penilaianid}, function(response) {

                    $scope.penilaianLatihan = response;

                    $scope.totalMarkah = 0;
                    $scope.jumlahKeseluruhanMarkah = $scope.penilaianLatihan.peserta.length * 50;

                    executeStatsForBahagian1();

                }, function(error) {
                    console.error(error);
                });

            };

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

        }]);