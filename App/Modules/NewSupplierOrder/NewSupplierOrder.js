(function () {
    'use strict';

    angular.module('App').controller('NewSupplierOrder', NewSupplierOrder);
    NewSupplierOrder.$inject = [
        '$scope',
        'alertify', 'SuppliersRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope', '$uibModal'


    ];

    function NewSupplierOrder($scope, alertify, suppliersRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, $rootScope, $uibModal) {

        console.log($rootScope.CurrentUser);
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'desc'])
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
        getReawntOrder(1, $rootScope.CurrentUser.UserID);

        function getReawntOrder(orderstate, UserID) {

             suppliersRepository.GetOrderforSupplers(orderstate, UserID).then(function (result) {
                console.log(result);
                $scope.OrderList = result;
                // $scope.NumberOfOperation = result[0].NumberOfOperation;
                // $scope.NumberOfProduct = result[0].NumberOfProduct;
                // $scope.Total = result[0].ProductPriceDesc;
                console.log($scope.ProductPriceDesc);
                 $scope.NumberOfProduct = result.length
                 // $scope.NumberOfOperation = result.length;
            });


            suppliersRepository.GetAbstarctSupplier2({
                FromDate: '2017-01-01',
                ToDate: new Date(),
                SupplierID: $rootScope.CurrentUser.UserID,
                OrderState: 1

            }).then(function (result) {
                console.log(result.data);
                $scope.SerachAbstractResult = result.data;

                // $scope.NumberOfProduct = result.data[0].NumberOfProduct;
                $scope.NumberOfOperation = result.data;
                // $scope.Total = result.data[0].Total - (result.data[0].Total*  $scope.Ar5sspresntage );
                // for(var i = 0 ; i < result.data.length ; i++){
                // $scope.NumberOfProduct =  result.data[i].order_details.length
                // }

            });
        }

        getStore();
        // $scope.data = function () {
        //     console.log($scope.Store.SellerId);
        //     return suppliersRepository.GetOrderforSupplers($scope.OrderState, $scope.Store.SellerId).then(function (result) {
        //         console.log(result);
        //         $scope.OrderList = result
        //
        //         $scope.NumberOfOperation = result.data[0].NumberOfOperation;
        //         $scope.NumberOfProduct = result.data[0].NumberOfProduct;
        //         for (var i = 0; i < $scope.SerachResult.length; i++) {
        //             $scope.Total += $scope.SerachResult[i].ProductPriceDesc;
        //             console.log($scope.Total)
        //         }
        //     })
        // };

        function getStore() {
            return suppliersRepository.getStore($rootScope.CurrentUser.UserID).then(function (result) {
                $scope.Store = result;
                console.log($scope.Store);
            })

        }

        $scope.PendingOrder = function (orderList) {
            alertify.confirm(
                $filter('translate')('AgreeOrder'),
                function () {

                    return suppliersRepository.CloseOrder(orderList.OrderID, 2).then(function (result) {
                        $filter('translate')('Done');
                        return getReawntOrder(1, $rootScope.CurrentUser.UserID);

                        // return $scope.OrderList.splice($scope.OrderList.indexOf(orderList), 1);

                    })

                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });
        };


        $scope.CancelOrder = function (orderList) {

            alertify.confirm(
                $filter('translate')('CancelOrder'),
                function () {

                    var Order = angular.extend({}, orderList);
                    var modalInstance = $uibModal.open({
                        templateUrl: 'App/Modules/NewSupplierOrder/CancledOrder/CancledOrder.html',
                        controller: 'CancledOrder',
                        size: 'lg',
                        windowClass: 'zindex',
                        resolve: {
                            OrderObj: function () {
                                return Order;
                            }
                        }
                    });

                    modalInstance.result.then(function (saved) {
                        return $scope.OrderList.splice($scope.OrderList.indexOf(orderList), 1);

                    });


                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });


        };


    }
})();