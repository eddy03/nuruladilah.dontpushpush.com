angular.module('dylurp')
    .controller('AnalisaStatistik', [
        '$scope',
        '$http',
        'AnalisaLatihanModel',
        'BahagianModel',
        function($scope, $http, AnalisaLatihanModel, BahagianModel) {

            var seriesAll = [];
            $scope.allData = [];

            init();

            function init() {

                $http.get('API/v1/latihan/analisa/soalan', {})
                    .then(function(results) {

                        var setJawapanBahagianASoalan2 = _.find(results.data.soalanBhgA, {id: 2}).set_jawapan;
                        _.each(setJawapanBahagianASoalan2, function(o) {
                            o.total = 0;
                        });

                        BahagianModel.query({}, function(responseBahagian) {

                            seriesAll = responseBahagian;

                            // Init results object
                            _.each(seriesAll, function(rb) {
                                rb.bahagianA = {
                                    soalan1: {ya: 0, tidak: 0},
                                    soalan2: angular.copy(setJawapanBahagianASoalan2),
                                    soalan3: {ya: 0, tidak: 0},
                                    soalan4: {less: 0, more: 0},
                                }
                            });

                            AnalisaLatihanModel.query({}, function(responseAnalisa) {

                                _.each(responseAnalisa, function(analisa) {

                                    var RBIndex = _.findIndex(seriesAll, function(o) {
                                        return o.id == analisa.bahagian_id
                                    });

                                    _.each(analisa.jawapan_bhg_a, function(ja) {

                                        if(ja.soalan_analisa_bhg_a_id == 1) {
                                            if(ja.jawapan == 1) {
                                                seriesAll[RBIndex].bahagianA.soalan1.ya++;
                                            } else {
                                                seriesAll[RBIndex].bahagianA.soalan1.tidak++;
                                            }
                                        } else if(ja.soalan_analisa_bhg_a_id == 3) {
                                            if(ja.jawapan == 1) {
                                                seriesAll[RBIndex].bahagianA.soalan3.ya++;
                                            } else {
                                                seriesAll[RBIndex].bahagianA.soalan3.tidak++;
                                            }
                                        } else if(ja.soalan_analisa_bhg_a_id == 4) {
                                            if(ja.jawapan == 1) {
                                                seriesAll[RBIndex].bahagianA.soalan4.less++;
                                            } else {
                                                seriesAll[RBIndex].bahagianA.soalan4.more++;
                                            }
                                        } else if(ja.soalan_analisa_bhg_a_id == null) {

                                            if(ja.jawapan == 1) {
                                                var S2Index = _.findIndex(seriesAll[RBIndex].bahagianA.soalan2, function(o) {
                                                    return o.id == ja.set_jawapan_soalan_analisa_bhg_a_id
                                                });
                                                seriesAll[RBIndex].bahagianA.soalan2[S2Index].total++;
                                            }
                                        }
                                    });

                                });

                                question1Generate();

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

            function question1Generate() {
                var series = [];
                var label = [];
                var categories = _.map(seriesAll, 'nama');

                label.push({
                    title: 'Soalan 1',
                    sub: 'Pada pendapat anda, adakah organisasi anda menyediakan peluang untuk meningkatkan pengetahuan dan kemahiran anda dalam bidang utama kerja?'
                });
                series.push({
                    data: [{
                        name: 'Ya',
                        data: []
                    }, {
                        name: 'Tidak',
                        data: []
                    }]
                });

                label.push({
                    title: 'Soalan 2',
                    sub: 'Pada pendapat anda, apakah metodologi/kaedah latihan yang lebih berkesan untuk meningkatkan kualiti kerja anda?'
                });
                series.push({
                    data: [{
                        name: 'Seminar',
                        data: []
                    }, {
                        name: 'Ceramah',
                        data: []
                    }, {
                        name: 'Bengkel',
                        data: []
                    }, {
                        name: 'Amali/Latih Amal',
                        data: []
                    }]
                });

                label.push({
                    title: 'Soalan 3',
                    sub: 'Bolehkah kursus/latihan yang disediakan dan dihadiri membantu meningkatkan kecekapan kerja/tugasan anda?'
                });
                series.push({
                    data: [{
                        name: 'Ya',
                        data: []
                    }, {
                        name: 'Tidak',
                        data: []
                    }]
                });

                label.push({
                    title: 'Soalan 4',
                    sub: 'Secara amnya, berapa lamakah anda sanggup menghadiri sesuatu kursus/latihan?'
                });
                series.push({
                    data: [{
                        name: 'Kurang 3 hari',
                        data: []
                    }, {
                        name: 'Lebih 3 hari',
                        data: []
                    }]
                });

                _.each(seriesAll, function(ad) {

                    series[0].data[0].data.push(ad.bahagianA.soalan1.ya);
                    series[0].data[1].data.push(ad.bahagianA.soalan1.tidak);

                    series[1].data[0].data.push(ad.bahagianA.soalan2[0].total);
                    series[1].data[1].data.push(ad.bahagianA.soalan2[1].total);
                    series[1].data[2].data.push(ad.bahagianA.soalan2[2].total);
                    series[1].data[3].data.push(ad.bahagianA.soalan2[3].total);

                    series[2].data[0].data.push(ad.bahagianA.soalan3.ya);
                    series[2].data[1].data.push(ad.bahagianA.soalan3.tidak);

                    series[3].data[0].data.push(ad.bahagianA.soalan4.less);
                    series[3].data[1].data.push(ad.bahagianA.soalan4.more);

                });

                generateChart('#chart11', label[0], categories, series[0].data);
                generateChart('#chart12', label[1], categories, series[1].data);
                generateChart('#chart13', label[2], categories, series[2].data);
                generateChart('#chart14', label[3], categories, series[3].data);

                // generateChart('#chart11', {
                //     title: 'Soalan 1',
                //     sub: 'Pada pendapat anda, adakah organisasi anda menyediakan peluang untuk meningkatkan pengetahuan dan kemahiran anda dalam bidang utama kerja?'
                // }, {
                //     name: 'Jawapan',
                //     colorByPoint: true,
                //     data: [{
                //         name: 'Ya',
                //         y: 56.33
                //     }, {
                //         name: 'Tidak',
                //         y: 24.03
                //     }]
                // });

            }

            function generateChart(element, question, categories, series) {

                $(element).highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: question.title
                    },
                    subtitle: {
                        text: question.sub
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: true
                    },
                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: 'Jumlah jawapan'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} jawapan</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: series
                });

            }

        }]);