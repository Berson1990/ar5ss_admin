/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ClosedOrder', ClosedOrder);
    ClosedOrder.$inject = [
        '$scope',
        '$state',
        'alertify',
        'SalesRepository',
        'Size',
        'Category',
        'Brand',
        'Product',
        'Users',
        '$rootScope',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'

    ];

    function ClosedOrder($scope, $state, alertify, salesRepository, size, category, brand, product, users, $rootScope, dtOptionsBuilder, dtColumnDefBuilder) {
        $scope.Product = product;
        $scope.Brand = brand;
        $scope.Category = category;
        $scope.Size = size;
        $scope.Users = users;
        $scope.Total = 0;
        $scope.AllProduct = false;
        $scope.AllBrand = false;
        $scope.AllCategory = false;
        $scope.AllUsers = false;

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
            salesRepository.SalesReport({
                FromDate: MontheBefore,
                ToDate: today,
                BrandID: '',
                CategoryID: '',
                ProductID: '',
                OrderState: '4',
                UserID: ''
            }).then(function (result) {
                $scope.SerachResult = result.data;
                console.log($scope.SerachResult);

                console.log($scope.Total)


            });
            salesRepository.SalesReportAbastract({
                FromDate: MontheBefore,
                ToDate: today,
                BrandID: '',
                CategoryID: '',
                ProductID: '',
                OrderState: '4',
                UserID: ''
            }).then(function (result) {
                $scope.SerachAbstractResult = result.data;
                // console.log( $scope.SerachAbstractResult)
            });


        }


        $scope.SalesReport = {
            FromDate: new Date(),
            ToDate: new Date(),
            BrandID: '',
            CategoryID: '',
            ProductID: '',
            OrderState: '4',
            UserID: ''
        };

        $scope.search = function () {
            if ($scope.AllProduct === true) {

                $scope.SalesReport.ProductID = '';
            }
            if ($scope.AllBrand === true) {

                $scope.SalesReport.BrandID = '';
            }
            if ($scope.AllCategory === true) {

                $scope.SalesReport.CategoryID = '';
            }
            if ($scope.AllUsers === true) {

                $scope.SalesReport.UserID = '';
            }

            console.log($scope.SalesReport);
            salesRepository.SalesReport($scope.SalesReport).then(function (result) {
                $scope.SerachResult = result.data;
                console.log($scope.SerachResult)
            })
        }


    }
})();