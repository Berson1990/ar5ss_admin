/**
 * Created by Alex4Prog on 20/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ProductState', ProductState);
    ProductState.$inject = [
        '$scope', '$uibModal',
        'alertify', 'ProductRepository','Size', 'Category', 'Brand','$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'ProductList', '$rootScope'
    ];

    function ProductState($scope, $uibModal, alertify, productRepository, size, category, brand,$filter, dtOptionsBuilder, dtColumnDefBuilder, productList, $rootScope) {
        $scope.Product = productList;
        console.log(productList);
        // $scope.userData = $rootScope.CurrentUser;
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


        $scope.ProductAddEdit = function (product, isEditMode) {
            var Product = angular.extend({}, product);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Product/ProductAddEdit/ProductAddEdit.html',
                controller: 'ProductAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Product: function () {
                        return Product;
                    },
                    Brand: function () {
                        return brand;
                    },
                    Category: function () {
                        return category;
                    },
                    Size: function () {
                        return size;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {
                    var productIds = _.map(productList, 'ProductID');
                    var productIndex = _.indexOf(productIds, saved.ProductID);
                    $scope.Product[productIndex] = saved;
                    alertify.success('done')
                }
                else {
                    $scope.Product.push(saved);
                    alertify.success('done')
                }
                console.log(saved);
            });
        };

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



        $scope.AdminAprove = function (ProductList) {
            console.log(ProductList.ProductID);
            alertify.confirm(
                $filter('translate')('WarningAprove'),
                function () {

                    return productRepository.AproveProduct(ProductList.ProductID).then(function (result) {
                        alertify.success($filter('translate')('Done'));
                        return $scope.Product.splice($scope.Product.indexOf(ProductList), 1);
                    })

                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });
        };


        $scope.Delete = function (ProductList) {

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {

                    return productRepository.DeletePendingProduct(ProductList.ProductID).then(function (result) {
                        alertify.success($filter('translate')('Done'));
                        return $scope.Product.splice($scope.Product.indexOf(ProductList), 1);
                    })
                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });

        }
    }
})();