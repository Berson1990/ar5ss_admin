/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ColsedOrderBills', ColsedOrderBills);
    ColsedOrderBills.$inject = [
        '$scope',
        '$state',
        '$filter',
        'alertify',
        'SalesRepository',
        'supplerisorder',
        '$rootScope',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'

    ];

    function ColsedOrderBills($scope, $state, $filter, alertify, salesRepository, supplerisorder, $rootScope, dtOptionsBuilder, dtColumnDefBuilder) {


        $scope.OrderCashList = supplerisorder.data.Suppliers;
        $scope.ar5sspercent = supplerisorder.data.ar5sspercent[0].percent;
        console.log($scope.OrderCashList);
        console.log($scope.ar5sspercent);

        $scope.FromDate = new Date();
        $scope.Todate = new Date();
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

        $scope.search = function () {
            if ($scope.AllOrders === true) {

                $scope.OrderCashList.OrderID = '';
            }

            var Fromdate = ($scope.FromDate.getFullYear() + '-' + ($scope.FromDate.getMonth() + 1) + '-' + $scope.FromDate.getDate());
            var ToDate = ( $scope.Todate.getFullYear() + '-' + ($scope.Todate.getMonth() + 1) + '-' + $scope.Todate.getDate());
            var mapparams = {
                SupplierID: $scope.OrderCashList[0].SupplierID,
                FromDate: Fromdate,
                ToDate: ToDate,
                OrderID: $scope.OrderCashList.OrderID
            };


            salesRepository.SupplersBilssFilter(mapparams).then(function (result) {

                $scope.ar5sspercent = result.data.ar5sspercent[0].percent;
                $scope.OrderCashList = result.data.Suppliers;
                console.log($scope.ar5sspercent);
                console.log($scope.OrderCashList);

            })
        }

    }
})();