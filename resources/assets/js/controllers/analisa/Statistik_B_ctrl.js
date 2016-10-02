angular.module('dylurp')
    .controller('AnalisaStatistikB', [
        '$scope',
        '$http',
        'AnalisaLatihanModel',
        'BahagianModel',
        function($scope, $http, AnalisaLatihanModel, BahagianModel) {

            var setJawapanBahagianB = null;
            var seriesAll = [];
            $scope.allData = [];
            $scope.bahagianB = [];
            $scope.bahagianBDefault = null;
            $scope.listOfBahagian = null;
            $scope.selectedBahagian = null;
            $scope.chartsOption = [];
            $scope.listOfAnalisa = [];

            var chartStructure = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} jawapan</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    }
                },
                title: {
                    text: 'Hello'
                },
                xAxis: {
                    categories: [],
                    crosshair: true,
                    title: {
                        text: 'Sub bahagian kursus'
                    }
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Jumlah jawapan'
                    }
                },
                useHighStocks: false,
                series: [],
                //function (optional)
                func: function (chart) {
                    //setup some logic for the chart
                }
            };

            init();

            function init() {

                $http.get('API/v1/latihan/analisa/soalan', {})
                    .then(function(results) {

                        $scope.bahagianB = angular.copy(results.data.soalanBhgB);
                        _.each($scope.bahagianB, function(bhg) {
                            _.each(bhg.kursus, function(k) {
                                k.totalSangatPerlu = 0;
                                k.totalPerlu = 0;
                                k.totalTidakPerlu = 0;
                            });
                        });

                        $scope.bahagianBDefault = angular.copy($scope.bahagianB);

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
                $scope.bahagianB = angular.copy($scope.bahagianBDefault);

                // Todo : this can be improve, but hey...there is nothing need to be improve
                _.each($scope.listOfAnalisa, function(analisa) {

                    if(analisa.bahagian_id == b) {

                        _.each(analisa.jawapan_bhg_b, function(jwpB) {

                            _.each($scope.bahagianB, function(charData) {

                                var index = _.findIndex(charData.kursus, {id: jwpB.analisa_kursus_bahagian_b_id});

                                if(index != -1) {

                                    if(jwpB.jawapan == 1) {
                                        charData.kursus[index].totalSangatPerlu++;
                                    } else if(jwpB.jawapan == 2) {
                                        charData.kursus[index].totalPerlu++;
                                    } else if(jwpB.jawapan == 3) {
                                        charData.kursus[index].totalTidakPerlu++;
                                    }

                                }

                            })

                        });

                    }

                });

                _.each($scope.bahagianB, function(answer) {

                    var chart = angular.copy(chartStructure);
                    chart.title.text = answer.bahagian;
                    chart.xAxis.categories = _.map(answer.kursus, 'kursus');

                    chart.series = [{
                        name: 'Sangat Perlu',
                        data: []
                    }, {
                        name: 'Perlu',
                        data: []
                    }, {
                        name: 'Tidak Perlu',
                        data: []
                    }];

                    _.each(answer.kursus, function(kursus) {
                        chart.series[0].data.push(kursus.totalSangatPerlu);
                        chart.series[1].data.push(kursus.totalPerlu);
                        chart.series[2].data.push(kursus.totalTidakPerlu);
                    });

                    $scope.chartsOption.push(chart);

                })

            })

        }
    ]);