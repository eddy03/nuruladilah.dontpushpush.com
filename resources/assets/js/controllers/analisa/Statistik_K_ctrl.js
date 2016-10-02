angular.module('dylurp')
    .controller('AnalisaStatistikk', [
        '$scope',
        '$http',
        'AnalisaLatihanModel',
        'BahagianModel',
        function($scope, $http, AnalisaLatihanModel, BahagianModel) {

            var soalanKompentensi = null;
            $scope.listOfBahagian = null;
            $scope.selectedBahagian = null;
            $scope.chartsOption = [];
            $scope.listOfAnalisa = [];

            var chartStructurePie = {
                options: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    }
                },
                //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
                useHighStocks: false,
                func: function (chart) {
                    //setup some logic for the chart
                }
            }

            init();

            function init() {

                $http.get('API/v1/latihan/analisa/soalan', {})
                    .then(function(results) {

                        soalanKompentensi = angular.copy(results.data.soalanKompetensi);

                        BahagianModel.query({}, function(responseBahagian) {

                            $scope.listOfBahagian = angular.copy(responseBahagian);

                            AnalisaLatihanModel.query({}, function(responseAnalisa) {

                                $scope.listOfAnalisa = angular.copy(responseAnalisa);

                                $scope.selectedBahagian = '1';

                            }, function(err) {
                                console.error(err);
                            });

                        }, function(error) {
                            console.error(error);
                        });

                    }, function(error) {
                        console.error(error);
                    });

            }

            $scope.$watch('selectedBahagian', function(b) {

                $scope.chartsOption = [];
                var sectionKompetensi = angular.copy(soalanKompentensi);
                var totalPersonInside = 0;

                _.each($scope.listOfAnalisa, function(analisa) {

                    if(analisa.bahagian_id == b) {

                        totalPersonInside++;

                        _.each(analisa.jawapan_kompetensi, function(kompentensi) {

                            var indexOfSoalan = _.findIndex(sectionKompetensi, function(sk) {
                                return sk.id == kompentensi.soalan_kompetensi_id;
                            });

                            if(typeof sectionKompetensi[indexOfSoalan].totalTKM == 'undefined') {
                                sectionKompetensi[indexOfSoalan].totalTKM = 0;
                            }
                            if(typeof sectionKompetensi[indexOfSoalan].totalTKP == 'undefined') {
                                sectionKompetensi[indexOfSoalan].totalTKP = 0;
                            }
                            if(typeof sectionKompetensi[indexOfSoalan].totalTKKM == 'undefined') {
                                sectionKompetensi[indexOfSoalan].totalTKKM = 0;
                            }
                            if(typeof sectionKompetensi[indexOfSoalan].totalTKKP == 'undefined') {
                                sectionKompetensi[indexOfSoalan].totalTKKP = 0;
                            }

                            if(kompentensi.diri_sendiri == 1 && kompentensi.jenis_penilaian == 1) {
                                sectionKompetensi[indexOfSoalan].totalTKM += kompentensi.jawapan;
                            } else if(kompentensi.diri_sendiri == 0 && kompentensi.jenis_penilaian == 1) {
                                sectionKompetensi[indexOfSoalan].totalTKP += kompentensi.jawapan;
                            } else if(kompentensi.diri_sendiri == 1 && kompentensi.jenis_penilaian == 2) {
                                sectionKompetensi[indexOfSoalan].totalTKKM += kompentensi.jawapan;
                            } else if(kompentensi.diri_sendiri == 0 && kompentensi.jenis_penilaian == 2) {
                                sectionKompetensi[indexOfSoalan].totalTKKP += kompentensi.jawapan;
                            }

                        })

                    }

                });

                var totalAll = totalPersonInside * 20;

                _.each(sectionKompetensi, function(sk) {

                    var chart = angular.copy(chartStructurePie);

                    chart.options.title.text = sk.soalan;
                    chart.options.subtitle.text = sk.penerangan;

                    chart.series = [{
                        name: 'Tahap',
                        colorByPoint: true,
                        data: [{
                            name: 'Tahap Kebolehan Diri Sendiri',
                            y: sk.totalTKM
                        }, {
                            name: 'Tahap Kebolehan Penyelia',
                            y: sk.totalTKP
                        }, {
                            name: 'Tahap Keperluan Kerja Diri Sendiri',
                            y: sk.totalTKKM
                        }, {
                            name: 'Tahap Keperluan Kerja Penyelia',
                            y: sk.totalTKKP
                        }]
                    }];

                    $scope.chartsOption.push(chart)

                });



            });

        }
    ]);