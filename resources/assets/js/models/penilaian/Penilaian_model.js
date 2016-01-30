angular.module('dylurp')
    .provider('PenilaianLatihanModel', function () {

        this.$get = ['$resource', function ($resource) {

            return $resource('API/v1/latihan/penilaian/penilaian/:penilaian_id/:option', {}, {update: {method: 'PUT'}});

        }];

    })
    .provider('JawapanModel', function () {

        this.$get = ['$resource', function ($resource) {

            return $resource('API/v1/latihan/penilaian/jawapan/:peserta_id/:option', {}, {update: {method: 'PUT'}});

        }];

    });
