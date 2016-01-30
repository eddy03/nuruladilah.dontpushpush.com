angular.module('dylurp')
    .provider('BahagianModel', function () {

        this.$get = ['$resource', function ($resource) {

            return $resource('API/v1/konfigurasi/bahagian/:bahagian_id/:option', {}, {update: {method: 'PUT'}});

        }];

    });