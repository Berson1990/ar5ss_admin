/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('DashBord', DashBord);
    DashBord.$inject = [
        '$scope',
        '$state',
        'alertify',
        'SalesDash',
        'SalesDay',
        'SalesBrand',
        'SalesCategory',
        'SalesProduct',
        'SalesRepository',
        'Category',
        'Brand',
        'Product'

    ];

    function DashBord($scope, $state, alertify, salesDash, salesDay, salesBrand, salesCategory, salesProduct, salesRepository, category, brand, product) {
        $scope.category = category;
        $scope.Brand = brand;
        $scope.Category = category;
        $scope.Product = product;
        $scope.Product = product;
        $scope.SalesBrand = salesBrand.data;
        $scope.SalesDash = salesDash.data;
        $scope.SalesDay = salesDay.data;
        $scope.SalesCategory = salesCategory.data;
        $scope.SalesProduct = salesProduct.data;
        console.log($scope.SalesBrand)
        console.log($scope.SalesDash)
        console.log($scope.SalesDay)
        console.log($scope.SalesCategory)
        console.log($scope.SalesProduct)

        $scope.FromDate = new Date();
        $scope.ToDate = new Date();
        var arrData = new Array();
        var arrLabels = new Array();

        // var arrSalesDayData = new Array();
        // var arrSalesDayLabels = new Array();

        var arrBrandData = new Array();
        var arrBrandLabels = new Array();

        var arrCateData = new Array();
        var arrCateLabels = new Array();

        var arrProductData = new Array();
        var arrProductLabels = new Array();

        var arrSalesbyDayData = new Array();
        var arrSalesbyDayLabels = new Array();


        for (var i = 0; i < $scope.SalesDash.length; i++) {
            arrData.push($scope.SalesDash[i].ORDERS);
            arrLabels.push($scope.SalesDash[i].Labels);
        }

        for (var d = 0; d < $scope.SalesDay.length; d++) {

            arrSalesbyDayData.push($scope.SalesDay[d].ORDERS);
            arrSalesbyDayLabels.push($scope.SalesDay[d].Labels);
        }

        for (var b = 0; b < $scope.SalesBrand.length; b++) {
            arrBrandData.push($scope.SalesBrand[b].ORDERS);
            arrBrandLabels.push($scope.SalesBrand[b].Labels);
        }


        for (var c = 0; c < $scope.SalesCategory.length; c++) {
            arrCateData.push($scope.SalesCategory[c].ORDERS);
            arrCateLabels.push($scope.SalesCategory[c].Labels);
        }


        for (var p = 0; p < $scope.SalesProduct.length; p++) {
            arrProductData.push($scope.SalesProduct[p].ORDERS);
            arrProductLabels.push($scope.SalesProduct[p].Labels);
        }


        $scope.data = [];
        $scope.labels = [];

        $scope.dataBrand = [];
        $scope.labelsBrand = [];

        $scope.dataCategory = [];
        $scope.labelsCategory = [];

        $scope.dataPrdouct = [];
        $scope.labelsProduct = [];

        $scope.dataSalesByDay = [];
        $scope.labelsByDAy = [];

        $scope.data.push(arrData.slice(0));

        $scope.dataBrand.push(arrBrandData.slice(0));

        $scope.dataCategory.push(arrCateData.slice(0));

        $scope.dataPrdouct.push(arrProductData.slice(0));

        $scope.dataSalesByDay.push(arrSalesbyDayData.slice(0));


        for (var i = 0; i < arrLabels.length; i++) {
            $scope.labels.push(arrLabels[i]);

        }
        for (var d = 0; d < arrSalesbyDayLabels.length; d++) {
            $scope.labelsByDAy.push(arrSalesbyDayLabels[d]);

        }
        /*--------------------------------*/

        for (var b = 0; b < arrBrandLabels.length; b++) {
            $scope.labelsBrand.push(arrBrandLabels[b]);

        }

        /*--------------------------------------*/

        for (var c = 0; c < arrCateLabels.length; c++) {
            $scope.labelsCategory.push(arrCateLabels[c]);

        }

        /*------------------------------------------*/

        for (var p = 0; p < arrProductLabels.length; p++) {
            $scope.labelsProduct.push(arrProductLabels[p]);

        }
        /*-------------------------------------------*/


        $scope.SalesFilter = function () {
            var mapdParams = {
                FromDate: $scope.FromDate,
                ToDate: $scope.ToDate
            };
            salesRepository.SalesFilter(mapdParams).then(function (result) {

                $scope.SalesDash = result.data;

                var arrData = new Array();
                var arrLabels = new Array();
                for (var i = 0; i < $scope.SalesDash.length; i++) {
                    arrData.push($scope.SalesDash[i].ORDERS);
                    arrLabels.push($scope.SalesDash[i].Labels);
                }
                $scope.data = [];
                $scope.labels = [];
                $scope.data.push(arrData.slice(0));

                for (var i = 0; i < arrLabels.length; i++) {
                    $scope.labels.push(arrLabels[i]);

                }
            });
        };
        $scope.SalesByDayFilter = function () {
            var mapdParams = {
                FromDate: $scope.FromDate,
                ToDate: $scope.ToDate
            };
            salesRepository.SalesFilterbyDay(mapdParams).then(function (result) {


                $scope.SalesDay = result.data;

                var arrSalesbyDayData = new Array();
                var arrSalesbyDayLabels = new Array();
                for (var d = 0; d < $scope.SalesDay.length; d++) {
                    arrSalesbyDayData.push($scope.SalesDay[d].ORDERS);
                    arrSalesbyDayLabels.push($scope.SalesDay[d].Labels);
                }
                $scope.dataSalesByDay = [];
                $scope.labelsByDAy = [];
                $scope.dataSalesByDay.push(arrSalesbyDayData.slice(0));
                for (var d = 0; d < arrSalesbyDayLabels.length; d++) {
                    $scope.labelsByDAy.push(arrSalesbyDayLabels[d]);
                }


            });
        };
        $scope.BrandFilter = function () {
            var mapdParams = {
                FromDate: $scope.FromDate,
                ToDate: $scope.ToDate,
                BrandID: $scope.Brand.BrandID
            };

            salesRepository.SalesBrandFilter(mapdParams).then(function (result) {

                $scope.SalesBrand = result.data;

                var arrBrandData = new Array();
                var arrBrandLabels = new Array();
                for (var b = 0; b < $scope.SalesBrand.length; b++) {
                    arrBrandData.push($scope.SalesBrand[b].ORDERS);
                    arrBrandLabels.push($scope.SalesBrand[b].Labels);
                }
                $scope.dataBrand = [];
                $scope.labelsBrand = [];
                $scope.dataBrand.push(arrBrandData.slice(0));

                for (var b = 0; b < arrBrandLabels.length; b++) {
                    $scope.labelsBrand.push(arrBrandLabels[b]);

                }
            });
        };
        $scope.CategoryFilter = function () {
            var mapdParams = {
                FromDate: $scope.FromDate,
                ToDate: $scope.ToDate,
                CategoryID: $scope.Category.CategoryID
            };

            salesRepository.SalesCategoryFilter(mapdParams).then(function (result) {

                $scope.SalesCategory = result.data;
                console.log($scope.SalesCategory);

                var arrCateData = new Array();
                var arrCateLabels = new Array();
                for (var c = 0; c < $scope.SalesCategory.length; c++) {
                    arrCateData.push($scope.SalesCategory[c].ORDERS);
                    arrCateLabels.push($scope.SalesCategory[c].Labels);
                }
                $scope.dataCategory = [];
                $scope.labelsCategory = [];

                $scope.dataCategory.push(arrCateData.slice(0));

                for (var c = 0; c < arrBrandLabels.length; c++) {
                    $scope.labelsCategory.push(arrCateLabels[c]);
                }

            });

        }
        $scope.ProductFilter = function () {
            var mapdParams = {
                FromDate: $scope.FromDate,
                ToDate: $scope.ToDate,
                ProductID: $scope.Product.ProductID
            };

            salesRepository.SalesProductFilter(mapdParams).then(function (result) {

                $scope.SalesProduct = result.data;
                console.log($scope.SalesProduct)
                var arrProductData = new Array();
                var arrProductLabels = new Array();
                for (var p = 0; p < $scope.SalesProduct.length; p++) {
                    arrProductData.push($scope.SalesProduct[p].ORDERS);
                    arrProductLabels.push($scope.SalesProduct[p].Labels);
                }
                $scope.dataPrdouct = [];
                $scope.labelsProduct = [];

                $scope.dataPrdouct.push(arrProductData.slice(0));

                for (var p = 0; p < arrProductLabels.length; p++) {
                    $scope.labelsProduct.push(arrProductLabels[p]);

                }

            });

        }
    };

})();