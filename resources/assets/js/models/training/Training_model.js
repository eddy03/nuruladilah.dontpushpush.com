angular.module('dylurp')
    .provider('PenilaianLatihanModel', function () {

        this.$get = ['$resource', function ($resource) {

            return $resource('penilaian/:penilaian_id/:option', {}, {update: {method: 'PUT'}});

        }];

    })
    .provider('JawapanModel', function () {

        this.$get = ['$resource', function ($resource) {

            return $resource('jawapan/:peserta_id/:option', {}, {update: {method: 'PUT'}});

        }];

    });
