'use strict';

var apps = angular.module('dylurp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap'
]);

apps.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/main.html',
            controller: 'MainCtrl'
        })
        .when('/training', {
            templateUrl: 'html/training/senarai_penilaian_latihan.html',
            controller: 'SenaraiPenilaianLatihan'
        })
        .when('/training/:penilaianId', {
            templateUrl: 'html/training/penilaian_latihan.html',
            controller: 'PenilaianLatihan'
        })
        .when('/training/:penilaianId/daftarjawapan', {
            templateUrl: 'html/training/daftar_jawapan_penilaian.html',
            controller: 'DaftarJawapanPenilaian'
        })
        .when('/training/:penilaianId/:pesertaId', {
            templateUrl: 'html/training/jawapan_penilaian.html',
            controller: 'JawapanPenilaian'
        })
        .otherwise({
            redirectTo: '/404'
        });

    $httpProvider.interceptors.push('noCacheInterceptor');
    $httpProvider.defaults.headers.common  = {
        'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr("content")
    };
}]);

apps.factory('noCacheInterceptor', function (){
    return {
        request: function (config) {
            if(config.method==='GET' && config.url.split('/')[0] === 'api'){
                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                config.url = config.url+separator+'cb=' + new Date().getTime();
            }
            return config;
        }
    };
});
