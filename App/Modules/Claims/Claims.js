/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('Claims', Claims);
    Claims.$inject = [
        '$scope',
        '$state',
        'alertify',
        'SuppliersRepository',
        'Users',
        'Ar5sspresntage',
        '$rootScope',
        'DTOptionsBuilder', 'DTColumnDefBuilder','SalesRepository'

    ];

    function Claims($scope, $state, alertify, suppliersRepository, users, ar5sspresntage, $rootScope, dtOptionsBuilder, dtColumnDefBuilder,salesRepository) {
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
                SupplierID: ''
            };
            console.log(mabdparms);
            suppliersRepository.Clims(mabdparms).then(function (result) {

                $scope.SerachResult = result.data.output;
                $scope.NumberOfProduct = result.data.NumberOfProduct[0].NumberOfProduct;
                $scope.NumberOfOperation = result.data.NumberOfProduct[0].NumberOfProduct
                console.log($scope.SerachResult);
                console.log($scope.NumberOfProduct);
                for (var i = 0; i < $scope.SerachResult.length; i++) {
                    if($scope.SerachResult[i].Percentage === '0.0') {
                        $scope.Total += ($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * ($scope.Ar5sspresntage/1000);
                    }else{
                        $scope.Total +=  ($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * ($scope.SerachResult[i].Percentage/1000)
                    }
                    console.log($scope.Total);
                    console.log (($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * $scope.SerachResult[i].Percentage);
                    console.log(($scope.SerachResult[i].Percentage)/100);

                }



            });

            // salesRepository.SalesReportAbastract({
            //     FromDate: '2017-01-01',
            //     ToDate: new Date(),
            //     BrandID: '',
            //     CategoryID: '',
            //     ProductID: '',
            //     OrderState: '3',
            //     UserID: '',
            //     FinanceState: 0
            // }).then(function (result) {
            //     console.log(result.data);
            //     $scope.SerachAbstractResult = result.data;
            //     $scope.NumberOfOperation = result.data[0].NumberOfOperation;
            //     // for(var i = 0 ; i< result.data.length ; i ++){
            //     //     $scope.Total += result.data[i].ProductPriceDesc;
            //     // }
            //
            // });

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
            suppliersRepository.Clims($scope.SalesReport).then(function (result) {
                console.log(result.data);
                $scope.NumberOfProduct = result.data.NumberOfProduct[0].NumberOfProduct;
                $scope.NumberOfOperation = result.data.NumberOfProduct.NumberOfOperation;
                $scope.SerachResult = result.data.output;
                for (var i = 0; i < $scope.SerachResult.length; i++) {
                    if($scope.SerachResult[i].Percentage === '0.0') {
                        $scope.Total += ($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * ($scope.Ar5sspresntage/1000);
                    }else{
                        $scope.Total +=  ($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * ($scope.SerachResult[i].Percentage/1000)
                    }
                    console.log($scope.Total);
                    console.log (($scope.SerachResult[i].CashPayment + $scope.SerachResult[i].CrditPayment) * $scope.SerachResult[i].Percentage);
                    console.log(($scope.SerachResult[i].Percentage)/100);

                }


                // $scope.NumberOfOperation = result.data[0].NumberOfOperation;
                // $scope.NumberOfProduct = result.data[0].NumberOfProduct;
                // for (var i = 0; i < $scope.SerachResult.length; i++) {
                //     $scope.Total += $scope.SerachResult[i].ProductPriceDesc;
                //     console.log($scope.Total)
                // }
                // console.log($scope.SerachResult)
            });

            // salesRepository.SalesReportAbastract({
            //     FromDate:  $scope.SalesReport.FromDate,
            //     ToDate:  $scope.SalesReport.ToDate,
            //     BrandID: '',
            //     CategoryID: '',
            //     ProductID: '',
            //     OrderState: '3',
            //     UserID: '',
            //     FinanceState: 0
            // }).then(function (result) {
            //     console.log(result.data);
            //     $scope.SerachAbstractResult = result.data;
            //     $scope.NumberOfOperation = result.data[0].NumberOfOperation;
            //     $scope.NumberOfProduct = result.data[0].NumberOfProduct;
            //     // for(var i = 0 ; i< result.data.length ; i ++){
            //     //     $scope.Total += result.data[i].ProductPriceDesc;
            //     // }
            //
            //
            //
            // });

        };

        $scope.FiniceOrder = function (serachResult, state) {
            console.log(serachResult.OrderID);
            console.log(state);

            suppliersRepository.ChangeFinicOrderState(serachResult, state).then(function (result) {

                console.log(result);
                return $scope.SerachResult.splice($scope.SerachResult.indexOf(serachResult), 1);

            })

        }


    }
})();