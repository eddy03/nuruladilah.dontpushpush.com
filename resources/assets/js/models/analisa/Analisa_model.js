angular.module('dylurp')
    .provider('AnalisaLatihanModel', function () {

        this.$get = ['$resource', function ($resource) {

            return $resource('API/v1/latihan/analisa/analisa/:analisa_id/:option', {}, {update: {method: 'PUT'}});

        }];

    });