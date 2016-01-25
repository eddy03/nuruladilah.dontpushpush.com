angular.module('dylurp')
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.labels = ["Januari", "Febuari", "Mac", "April", "May", "Jun", "Julai", "Ogos", "September", "November", "December"];
        $scope.chartoptions = {
            responsive: false,
            maintainAspectRatio: false,
        };

        $scope.yearList = [2015];
        var currentYear = new Date().getFullYear();
        var start = currentYear - $scope.yearList[0];
        for(var i = 0; i < start; i++) {
            $scope.yearList.push(currentYear + i);
        }

        $scope.form = {
            tahunsblm: 2015,
            tahunsehingga: currentYear
        };

        var generateFirstChart = function() {

            $http.get('/dashboard', {params: $scope.form})
                .then(function(results) {

                    $scope.series = [];
                    $scope.data = [];
                    var resultsGroupByYear = _.groupBy(results.data, 'tahun');

                    _.each(Object.keys(resultsGroupByYear), function(key) {
                        $scope.series.push(key);

                        var dataInSeries = [];
                        var notFound = 0;

                        for (var i = 1; i < 13; i++) {

                            var found = _.find(resultsGroupByYear[key], function(o) {
                                return o.bulan == i;
                            });

                            if(found) {
                                dataInSeries.push(found.total);
                            } else {
                                dataInSeries.push(0);
                            }

                        }

                        $scope.data.push(dataInSeries);

                    });

                }, function(error) {
                    console.log(error);
                });
        }

        $scope.$watch('form', function() {
            generateFirstChart();
        }, true);

        $('#calendar').fullCalendar();

    }]);