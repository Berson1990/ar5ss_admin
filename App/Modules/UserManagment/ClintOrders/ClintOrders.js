(function () {
    'use strict';

    angular.module('App').controller('ClintOrders', ClintOrders);
    ClintOrders.$inject = [
        '$scope',
        'alertify', 'SuppliersRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'UserID',
        'orderstate'


    ];

    function ClintOrders($scope, alertify, suppliersRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, UserID, orderstate) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.meals = [];
        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()

        ];
        $scope.dtOptions = dtOptionsBuilder.newOptions()
        // .withOption('order', [2, 'DESC'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'f><T>l>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");


        getReawntOrder(UserID, orderstate);

        function getReawntOrder(UserID, orderstate) {

            return suppliersRepository.GetResentOrder(UserID, orderstate).then(function (result) {
                console.log(result);
                $scope.OrderList = result;
                // $scope.OrderListBefore = result;
                // $scope.OrderList = _.groupBy($scope.OrderListBefore, "OrderID");
                // console.log($scope.OrderList);
            })
        }


    }
})();