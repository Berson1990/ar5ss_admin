(function () {
    'use strict';

    angular.module('App').controller('LateOrder', LateOrder);
    LateOrder.$inject = [
        '$scope',
        'alertify', 'SuppliersRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope'

    ];

    function LateOrder($scope, alertify, suppliersRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, $rootScope) {

        console.log($rootScope.CurrentUser);
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [0, 'Desc'])
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
        getReawntOrder($rootScope.CurrentUser.UserID);

        function getReawntOrder(UserID) {

             suppliersRepository.LateOrder(UserID).then(function (result) {
                console.log(result);
                $scope.OrderList = result;
                 $scope.NumberOfProduct = result.length
            });

            suppliersRepository.GetAbstarctSupplier3({
                FromDate: '2017-01-01',
                ToDate: new Date(),
                SupplierID: $rootScope.CurrentUser.UserID,
                OrderState: 3

            }).then(function (result) {
                console.log(result.data[0]);
                $scope.SerachAbstractResult = result.data;
                $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.Total = result.data[0].Total - (result.data[0].Total*  $scope.Ar5sspresntage );
                // for(var i = 0 ; i < result.data.length ; i++){
                // $scope.NumberOfProduct =  result.data[i].order_details.length
                // }

            });



        }





    }
})();