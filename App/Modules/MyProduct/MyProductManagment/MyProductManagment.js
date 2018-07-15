/**
 * Created by Alex4Prog on 20/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('MyProductManagment', MyProductManagment);
    MyProductManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'ProductRepository', 'Size', 'Category', 'Brand',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'ProductList', '$rootScope', '$filter'
    ];

    function MyProductManagment($scope, $uibModal, alertify, productRepository, size, category, brand, dtOptionsBuilder, dtColumnDefBuilder, productList, $rootScope, $filter) {


        // console.log($rootScope.CurrentUser.UserID);

        getproduct();

        function getproduct() {

            productRepository.MyProduct($rootScope.CurrentUser.UserID).then(function (productList) {

                $scope.Product = productList;

                console.log($scope.Product);


                // for (var i = 0; i < $scope.Product.length; i++) {
                //     // console.log($scope.Product[i].ProductQTY);
                //     getproductqty($scope.Product[i].ProductID, $scope.Product[i].StoreID, $scope.Product[i].Date, $scope.Product[i].ProductQTY);
                // }
            })
        }


         $scope.getproductqty = function(ProductList) {
            // console.log(ProductList.ProductID, ProductList.StoreID, ProductList.Date, ProductList.SupplierID);
            productRepository.ProductFinalQTY(ProductList.ProductID, ProductList.StoreID, ProductList.Date, ProductList.SupplierID).then(function (result) {

                $scope.NewItemsQTY = result.data[0].ItemsQTY;
                console.log($scope.NewItemsQTY);
                // $scope.Final = ProductList.ProductQTY - $scope.ItemsQTY;
                // console.log($scope.Final)
            });

        };

        // $scope.userData = $rootScope.CurrentUser;
        // console.log($rootScope.CurrentUser);
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [0, 'DESC'])
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


        $scope.getProductBalance = function (ProductList) {
            var Product = angular.extend({}, ProductList);
            // console.log(Product)
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/MyProduct/ProductBalance/ProductBalance.html',
                controller: 'ProductBalance',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    ProductObj: function () {
                        return Product;
                    },

                }
            });
        };

        $scope.UpdateProductQTY = function (product) {
            var Product = angular.extend({}, product);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/MyProduct/ModefiyProductQTY/ModefiyProductQTY.html',
                controller: 'ModefiyProductQTY',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    ProductObj: function () {
                        return Product;
                    },

                }
            });
            modalInstance.result.then(function (saved) {

                var Ids = _.map($scope.Product, 'ProductID');
                var Index = _.indexOf(Ids, saved.ProductID);
                $scope.Product[Index].ProductQTY = saved.ProductQTY;
                alertify.success('done');

                // console.log(saved);
            });
        };

        //product Image
        $scope.ProductImage = function (product) {
            var Product = angular.extend({}, product);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Product/ProductImage/ProductImage.html',
                controller: 'ProductImage',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Product: function () {
                        return Product;
                    }
                }
            });
        };


        $scope.AssginProperty = function (product) {

            var Product = angular.extend({}, product);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Product/AssignPropertyforProduct/AssignPropertyforProduct.html',
                controller: 'AssignPropertyforProduct',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Product: function () {
                        return Product;
                    }
                }
            });
        };


        $scope.Delete = function (product) {

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    productRepository.DeleteProduct(product.ProductID).then(function (result) {
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                            return $scope.Product.splice($scope.Product.indexOf(product), 1);

                        } else if (result.data.state === 203) {
                            alertify.error($filter('translate')('OperationComplex'));
                        }
                    });
                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });
        };

        $scope.UpdateProduct = function (ProductList) {
            productRepository.UpdateProductForAntherMonthe(ProductList.ProductID).then(function (result) {
                // console.log(result);
                var supplersIds = _.map($scope.Product, 'ProductID');
                var supplersIndex = _.indexOf(supplersIds, result.data.ProductID);
                $scope.Product[supplersIndex].Updated = result.data.Updated;

            })
        }


    }
})();