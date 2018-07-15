/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SupplierBudgeting', SupplierBudgeting);
    SupplierBudgeting.$inject = [
        '$scope',
        '$state',
        'alertify',
        'SuppliersRepository',
        'Ar5sspresntage',
        '$rootScope',
        'DTOptionsBuilder', 'DTColumnDefBuilder'

    ];

    function SupplierBudgeting($scope, $state, alertify, suppliersRepository, ar5sspresntage, $rootScope, dtOptionsBuilder, dtColumnDefBuilder) {
        $scope.Total = 0;
        $scope.AllProduct = false;
        $scope.AllUsers = false;
        $scope.Ar5sspresntage = ar5sspresntage.data[0].percent;
        $scope.BankPresnt = ar5sspresntage.data[0].BankPresnt;


        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()

        ];
        $scope.dtOptions = dtOptionsBuilder.newOptions()
        // .withOption('order', [2, 'DESC'])
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
                SupplierID: $rootScope.CurrentUser.UserID
            };


            console.log(mabdparms);
            suppliersRepository.GetBudGetingSupplier(mabdparms).then(function (result) {
                console.log(result.data);
                $scope.SerachResult = result.data.output;
                console.log( $scope.SerachResult );
                $scope.NumberOfProduct = result.data.NumberOFProduct[0].NumberOfProduct;

                var first =0;
                var soecend =0;
                for (var i = 0; i < $scope.SerachResult.length ; i++){
                    if ($scope.SerachResult[i].Percentage === '0.0') {
                        first = ($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * ($scope.Ar5sspresntage/1000);
                        soecend  = $scope.SerachResult[i].CrditPayment;
                        console.log(first);
                        console.log(soecend);
                        $scope.Total += first - soecend
                    } else {
                        first = ($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * ($scope.SerachResult[i].Percentage/1000);
                        soecend  = $scope.SerachResult[i].CrditPayment;
                        console.log(first);
                        console.log(soecend);
                        $scope.Total +=  first -  soecend;

                    }

                }

            });


            suppliersRepository.GetAbstarctSupplier({
                FromDate: '2017-01-01',
                ToDate: new Date(),
                SupplierID: $rootScope.CurrentUser.UserID,
                OrderState: 3

            }).then(function (result) {
                console.log(result.data);
                // $scope.SerachAbstractResult = result.data;
                // $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.NumberOfProduct = result.data[0].NumberOfProduct;
                $scope.NumberOfOperation = result.data;
                // $scope.Total = result.data[0].Total - (result.data[0].Total * $scope.Ar5sspresntage );
                // for(var i = 0 ; i < result.data.length ; i++){
                // $scope.NumberOfProduct =  result.data[i].order_details.length
                // }

            });

        }

        $scope.search = function () {

            var mabdparms = {
                FromDate: $scope.FromDate,
                ToDate: $scope.ToDate,
                SupplierID: $rootScope.CurrentUser.UserID
            };


            suppliersRepository.GetBudGetingSupplier(mabdparms).then(function (result) {
                $scope.SerachResult = result.data;
                console.log($scope.SerachResult);
                // $scope.ProductPriceDesc = result.data[0].ProductPriceDesc;
                // $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.NumberOfProduct = result.data[0].NumberOfProduct;


            });

            // suppliersRepository.GetAbstarctSupplier({
            //     FromDate: $scope.FromDate,
            //     ToDate: $scope.ToDate,
            //     SupplierID: $rootScope.CurrentUser.UserID,
            //     OrderState: 3
            //
            // }).then(function (result) {
            //     console.log(result.data);
            //     $scope.SerachAbstractResult = result.data;
            //     $scope.NumberOfOperation = result.data[0].NumberOfOperation;
            //     $scope.NumberOfProduct = result.data[0].NumberOfProduct;
            //     $scope.Total = result.data[0].Total;
            //     // for(var i = 0 ; i < result.data.length ; i++){
            //     // $scope.NumberOfProduct =  result.data[i].order_details.length
            //     // }
            //
            // });


        }

    }
})();