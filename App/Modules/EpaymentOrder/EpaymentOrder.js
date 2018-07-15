/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('EpaymentOrder', EpaymentOrder);
    EpaymentOrder.$inject = [
        '$scope',
        '$state',
        'alertify',
        'SalesRepository',
        'Users',
        'Ar5sspresntage',
        '$rootScope',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'

    ];

    function EpaymentOrder($scope, $state, alertify, salesRepository, users, ar5sspresntage, $rootScope, dtOptionsBuilder, dtColumnDefBuilder) {


        $scope.Users = users;
        $scope.Total = 0;
        $scope.AllProduct = false;
        $scope.AllUsers = false;
        $scope.Ar5sspresntage = ar5sspresntage.data[0].percent;
        $scope.BankPresnt = ar5sspresntage.data[0].BankPresnt;



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

        getBasicData();

        function getBasicData() {

            var today = new Date();
            var MontheBefore = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '-' + mm + '-' + dd;

            var dd2 = MontheBefore.getDate();
            var mm2 = MontheBefore.getMonth() - 1; //January is 0!
            var yyyy2 = MontheBefore.getFullYear();

            if (dd2 < 10) {
                dd2 = '0' + dd2
            }

            if (mm2 < 10) {
                mm2 = '0' + mm2
            }
            MontheBefore = yyyy2 + '-' + mm2 + '-' + dd2;
            console.log(MontheBefore);

            var mabdparms = {
                FromDate: '2017-01-01',
                ToDate: new Date(),
                SupplierID: ''
            };
            console.log(mabdparms);
            salesRepository.EPaymentOrder(mabdparms).then(function (result) {
                console.log(result);
                $scope.OrderCashList = result.data.output;
                $scope.BankPresnt = result.data.ar5sspercent[0].BankPresnt;
                $scope.NumberOfProduct = result.data.length;

            });

            salesRepository.SalesReportAbastract({
                FromDate: '2017-01-01',
                ToDate: new Date(),
                BrandID: '',
                CategoryID: '',
                ProductID: '',
                OrderState: '3',
                UserID: '',
                PaymentID : 2,
                FinanceState: 0
            }).then(function (result) {
                console.log(result.data);
                $scope.SerachAbstractResult = result.data;
                $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.NumberOfProduct = result.data[0].NumberOfProduct;
                // for(var i = 0 ; i< result.data.length ; i ++){
                //     $scope.Total += result.data[i].ProductPriceDesc;
                // }

            });

        }


        $scope.SalesReport = {
            FromDate: new Date(),
            ToDate: new Date(),
            SupplierID: ''
        };

        $scope.search = function () {

            if ($scope.AllUsers === true) {

                $scope.SalesReport.SupplierID = '';
            }

            console.log($scope.SalesReport);
            salesRepository.EPaymentOrder($scope.SalesReport).then(function (result) {
                $scope.OrderCashList = result.data.output;
                console.log($scope.OrderCashList);
                $scope.NumberOfOperation = result.data.length;
                $scope.NumberOfProduct = result.data.length;
                // for (var i = 0; i < $scope.OrderCashList.length; i++) {
                //     $scope.Total += $scope.OrderCashList[i].ProductPriceDesc;
                //     console.log($scope.Total)
                // }
                console.log($scope.OrderCashList)
            });
            salesRepository.SalesReportAbastract({
                FromDate:  $scope.SalesReport.FromDate,
                ToDate:  $scope.SalesReport.ToDate,
                BrandID: '',
                CategoryID: '',
                ProductID: '',
                OrderState: '3',
                UserID: '',
                FinanceState: 0
            }).then(function (result) {
                console.log(result.data);
                $scope.SerachAbstractResult = result.data;
                // $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.NumberOfProduct = result.data[0].NumberOfProduct;
                // for(var i = 0 ; i< result.data.length ; i ++){
                //     $scope.Total += result.data[i].ProductPriceDesc;
                // }



            });
        }

        $scope.SuppliersBills = function (orderCashList) {
            $scope.SupplierID = orderCashList.SupplierID;
            console.log($scope.SupplierID);
            $state.go('Master.CloseOrderEPyment', {"SupplierID": $scope.SupplierID});

        }
    }
})();