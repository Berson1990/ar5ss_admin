/**
 * Created by Alex4Prog on 20/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ProductUnderAddManagment', ProductUnderAddManagment);
    ProductUnderAddManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'ProductRepository', 'Size', 'Category', 'Brand',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'ProductList', '$rootScope','$filter'
    ];

    function ProductUnderAddManagment($scope, $uibModal, alertify, productRepository, size, category, brand, dtOptionsBuilder, dtColumnDefBuilder, productList, $rootScope,$filter) {


        console.log($rootScope.CurrentUser.UserID);

        getproduct();
        function getproduct() {

            productRepository.ProductUnderAdd($rootScope.CurrentUser.UserID).then(function (productList) {

                $scope.Product = productList;
            })
        }

        // $scope.userData = $rootScope.CurrentUser;
        console.log($rootScope.CurrentUser);
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            // .withOption('order', [0, 'DESC'])
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


    }
})();