

(function () {
    'use strict';

    angular.module('App').controller('SuppliersCancelOrder', SuppliersCancelOrder);
    SuppliersCancelOrder.$inject = [
        '$scope',
        'alertify', 'SuppliersRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope'

    ];

    function SuppliersCancelOrder($scope, alertify, suppliersRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, $rootScope) {

        console.log($rootScope.CurrentUser);
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'asc'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>f>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];
        getReawntOrder(4, $rootScope.CurrentUser.UserID);

        function getReawntOrder(orderstate, UserID) {

            return suppliersRepository.GetOrderforSupplers(orderstate, UserID).then(function (result) {
                console.log(result);
                $scope.OrderList = result
                $scope.NumberOfOperation = result[0].NumberOfOperation;
                $scope.NumberOfProduct = result[0].NumberOfProduct;
                $scope.Total = result[0].ProductPriceDesc;
            })
        }




    }
})();