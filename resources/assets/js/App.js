'use strict';

var apps = angular.module('dylurp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'blockUI',
    'chart.js',
    'highcharts-ng'
]);

apps.config(['$routeProvider', '$httpProvider', 'blockUIConfig', function($routeProvider, $httpProvider, blockUIConfig) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/main.html',
            controller: 'MainCtrl'
        })
        .when('/konfigurasi/bahagian', {
            templateUrl: 'html/konfigurasi/bahagian/senarai.html',
            controller: 'SenaraiBahagian'
        })
        .when('/penilaian', {
            templateUrl: 'html/penilaian/senarai_penilaian_latihan.html',
            controller: 'SenaraiPenilaianLatihan'
        })
        .when('/penilaian/:penilaianId', {
            templateUrl: 'html/penilaian/penilaian_latihan.html',
            controller: 'PenilaianLatihan'
        })
        .when('/penilaian/:penilaianId/daftarjawapan', {
            templateUrl: 'html/penilaian/daftar_jawapan_penilaian.html',
            controller: 'DaftarJawapanPenilaian'
        })
        .when('/penilaian/:penilaianId/:pesertaId', {
            templateUrl: 'html/penilaian/jawapan_penilaian.html',
            controller: 'JawapanPenilaian'
        })
        .when('/analisa', {
            templateUrl: 'html/analisa/senarai.html',
            controller: 'SenaraiAnalisaLatihan'
        })
        .when('/statistika', {
            templateUrl: 'html/analisa/statistik.html',
            controller: 'AnalisaStatistik'
        })
        .when('/statistikb', {
            templateUrl: 'html/analisa/statistik_b.html',
            controller: 'AnalisaStatistikB'
        })
        .when('/analisa/baru', {
            templateUrl: 'html/analisa/maklumat.html',
            controller: 'MaklumatAnalisaLatihan'
        })
        .when('/analisa/maklumat/:analisaId', {
            templateUrl: 'html/analisa/maklumat.html',
            controller: 'MaklumatAnalisaLatihan'
        })
        .when('/profile', {
            templateUrl: 'html/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/404', {
            templateUrl: 'html/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });

    $httpProvider.interceptors.push('noCacheInterceptor');
    $httpProvider.defaults.headers.common  = {
        'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr("content")
    };

    blockUIConfig.message = 'Sila tunggu sebentar!';
    blockUIConfig.delay = 0;
    blockUIConfig.blockBrowserNavigation = true;
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
