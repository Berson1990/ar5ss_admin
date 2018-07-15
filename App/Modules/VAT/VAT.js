(function () {
    'use strict';

    angular.module('App').controller('VAT', VAT);
    VAT.$inject = [
        '$scope',
        '$state',
        '$filter',
        'alertify',
        'ProductRepository',
        'VAT',
        '$rootScope',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'

    ];

    function VAT($scope, $state, $filter, alertify, productRepository, vAT, $rootScope, dtOptionsBuilder, dtColumnDefBuilder) {

        $scope.vat = vAT;
        console.log($scope.vat);

        $scope.ModifyVat = function () {

            productRepository.modfiyvatapi($scope.vat).then(function (result) {
                alertify.success('done')
                console.log(result);
            })
        }

    }
})();