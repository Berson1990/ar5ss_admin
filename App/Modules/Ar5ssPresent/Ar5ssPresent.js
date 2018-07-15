/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('Ar5ssPresent', Ar5ssPresent);
    Ar5ssPresent.$inject = [
        '$scope',
        '$state',
        '$filter',
        'alertify',
        'SalesRepository',
        'ar5sspresnteg',
        '$rootScope',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'

    ];

    function Ar5ssPresent($scope, $state, $filter, alertify, salesRepository, ar5sspresnteg, $rootScope, dtOptionsBuilder, dtColumnDefBuilder) {


        $scope.ar5sspresnteg = ar5sspresnteg.data[0];
        console.log($scope.ar5sspresnteg);

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()

        ];
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [2, 'DESC'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>f>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");

        $scope.ModifyPresntage = function () {

            if ($scope.ar5sspresnteg.percent > 100) {
                alertify.error($filter('translate')('PresantLimit'))
            } else if ($scope.ar5sspresnteg.BankPresnt > 100) {
                alertify.error($filter('translate')('PresantLimit'))
            } else {
                var mapdparams = {
                    percent: $scope.ar5sspresnteg.percent,
                    BankPresnt: $scope.ar5sspresnteg.BankPresnt,
                    Delegate: $scope.ar5sspresnteg.Delegate
                };
                console.log(mapdparams);
                salesRepository.UpdatePresentage(mapdparams).then(function (result) {
                    alertify.success($filter('translate')('Done'))
                    console.log(result)
                })
            }
        }

    }
})();