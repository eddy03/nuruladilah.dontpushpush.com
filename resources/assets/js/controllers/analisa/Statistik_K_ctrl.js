angular.module('dylurp')
  .controller('AnalisaStatistikk', [
    '$scope',
    '$http',
    'AnalisaLatihanModel',
    'BahagianModel',
    function ($scope, $http, AnalisaLatihanModel, BahagianModel) {

      var soalanKompentensi = null;
      $scope.listOfBahagian = null;
      $scope.selectedBahagian = null;
      $scope.chartsOption = [];
      $scope.listOfAnalisa = [];

      var chartStructurePie = {
        options: {
          chart: {
            type: 'column'
          },
          xAxis: {
            categories: ['KBA', 'KBP', 'KPKA', 'KPKP']
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Peratusan'
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
          },
          plotOptions: {
            column: {
              stacking: 'percent',
              dataLabels: {
                enabled: true,
                format: '{point.y}-{point.percentage:.0f}%'
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
          .then(function (results) {

            soalanKompentensi = angular.copy(results.data.soalanKompetensi);

            BahagianModel.query({}, function (responseBahagian) {

              $scope.listOfBahagian = angular.copy(responseBahagian);

              AnalisaLatihanModel.query({}, function (responseAnalisa) {

                $scope.listOfAnalisa = angular.copy(responseAnalisa);

                $scope.selectedBahagian = '0';

              }, function (err) {
                console.error(err);
              });

            }, function (error) {
              console.error(error);
            });

          }, function (error) {
            console.error(error);
          });

      }

      $scope.$watch('selectedBahagian', function (b) {

        $scope.chartsOption = [];
        var sectionKompetensi = angular.copy(soalanKompentensi);
        var totalPersonInside = 0;
        var insideObject = {
          satu: 0,
          dua: 0,
          tiga: 0,
          empat: 0,
          lima: 0
        }

        _.each($scope.listOfAnalisa, function (analisa) {

          if(b == 0) {

            _.each(analisa.jawapan_kompetensi, function(kompentensi) {

              var indexOfSoalan = _.findIndex(sectionKompetensi, function (sk) {
                return sk.id == kompentensi.soalan_kompetensi_id;
              });

              if (typeof sectionKompetensi[indexOfSoalan].TKM == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKM = angular.copy(insideObject);
              }
              if (typeof sectionKompetensi[indexOfSoalan].TKP == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKP = angular.copy(insideObject);
              }
              if (typeof sectionKompetensi[indexOfSoalan].TKKM == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKKM = angular.copy(insideObject);
              }
              if (typeof sectionKompetensi[indexOfSoalan].TKKP == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKKP = angular.copy(insideObject);
              }

              if (kompentensi.diri_sendiri == 1 && kompentensi.jenis_penilaian == 1) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKM.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKM.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKM.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKM.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKM.lima++;
                }

              } else if (kompentensi.diri_sendiri == 0 && kompentensi.jenis_penilaian == 1) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKP.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKP.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKP.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKP.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKP.lima++;
                }

              } else if (kompentensi.diri_sendiri == 1 && kompentensi.jenis_penilaian == 2) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKKM.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKKM.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKKM.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKKM.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKKM.lima++;
                }

              } else if (kompentensi.diri_sendiri == 0 && kompentensi.jenis_penilaian == 2) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKKP.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKKP.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKKP.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKKP.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKKP.lima++;
                }

              }

            })

            // console.log('Jawapan Kompetensi ', analisa.jawapan_kompetensi);

          } else if (analisa.bahagian_id == b) {

            _.each(analisa.jawapan_kompetensi, function(kompentensi) {

              var indexOfSoalan = _.findIndex(sectionKompetensi, function (sk) {
                return sk.id == kompentensi.soalan_kompetensi_id;
              });

              if (typeof sectionKompetensi[indexOfSoalan].TKM == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKM = angular.copy(insideObject);
              }
              if (typeof sectionKompetensi[indexOfSoalan].TKP == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKP = angular.copy(insideObject);
              }
              if (typeof sectionKompetensi[indexOfSoalan].TKKM == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKKM = angular.copy(insideObject);
              }
              if (typeof sectionKompetensi[indexOfSoalan].TKKP == 'undefined') {
                sectionKompetensi[indexOfSoalan].TKKP = angular.copy(insideObject);
              }

              if (kompentensi.diri_sendiri == 1 && kompentensi.jenis_penilaian == 1) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKM.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKM.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKM.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKM.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKM.lima++;
                }

              } else if (kompentensi.diri_sendiri == 0 && kompentensi.jenis_penilaian == 1) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKP.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKP.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKP.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKP.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKP.lima++;
                }

              } else if (kompentensi.diri_sendiri == 1 && kompentensi.jenis_penilaian == 2) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKKM.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKKM.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKKM.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKKM.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKKM.lima++;
                }

              } else if (kompentensi.diri_sendiri == 0 && kompentensi.jenis_penilaian == 2) {

                if(kompentensi.jawapan == 1) {
                  sectionKompetensi[indexOfSoalan].TKKP.satu++;
                } else if(kompentensi.jawapan == 2) {
                  sectionKompetensi[indexOfSoalan].TKKP.dua++;
                } else if(kompentensi.jawapan == 3) {
                  sectionKompetensi[indexOfSoalan].TKKP.tiga++;
                } else if(kompentensi.jawapan == 4) {
                  sectionKompetensi[indexOfSoalan].TKKP.empat++;
                } else if(kompentensi.jawapan == 5) {
                  sectionKompetensi[indexOfSoalan].TKKP.lima++;
                }

              }

            })

          }

        });

        var totalAll = totalPersonInside * 20;

        _.each(sectionKompetensi, function (sk) {

          console.log(sectionKompetensi);

          var chart = angular.copy(chartStructurePie);

          chart.options.title.text = sk.soalan;
          chart.options.subtitle.text = sk.penerangan;

          chart.series = [{
            name: '1',
            data: [sk.TKM.satu, sk.TKP.satu, sk.TKKM.satu, sk.TKKP.satu]
          }, {
            name: '2',
            data: [sk.TKM.dua, sk.TKP.dua, sk.TKKM.dua, sk.TKKP.dua]
          }, {
            name: '3',
            data: [sk.TKM.tiga, sk.TKP.tiga, sk.TKKM.tiga, sk.TKKP.tiga]
          }, {
            name: '4',
            data: [sk.TKM.empat, sk.TKP.empat, sk.TKKM.empat, sk.TKKP.empat]
          }, {
            name: '5',
            data: [sk.TKM.lima, sk.TKP.lima, sk.TKKM.lima, sk.TKKP.lima]
          }]

          $scope.chartsOption.push(chart)

        });


      });

    }
  ]);