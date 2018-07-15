/**
 * Created by Alex4Prog on 20/07/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ProductAddEdit', ProductAddEdit);
    ProductAddEdit.$inject = [
        '$scope', '$uibModal', '$rootScope', '$uibModalInstance', 'ProductRepository',
        'Brand', 'Category', 'Size', 'Product', 'IsEditMode', 'SizeRepository'
    ];

    function ProductAddEdit($scope, $uibModal, $rootScope, $uibModalInstance, ProductRepository, brand, category, size, product, isEditMode, sizeRepository) {

        $scope.Product = product;
        console.log(product);
        $scope.IsEditMode = isEditMode;
        $scope.Brand = brand;
        console.log($scope.Brand);
        // $scope.Size = size;
        $scope.Category = category;

        $scope.Isthereadiscount = {
            no: '1',
            yes: '2'
        };

        $scope.getsizerealte = function (CategoryID) {
            return sizeRepository.SzieRelated(CategoryID).then(function (result) {
                $scope.Size = result
            })
        };


        console.log($scope.Isthereadiscount);

        console.log($rootScope.CurrentUser);
        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.Product);
                AddEditImages();
                $uibModalInstance.close($scope.Product);

            };

            var create = function () {
                $scope.Product.UserID = $rootScope.CurrentUser.UserID;
                if ($rootScope.CurrentUser.UseType === 1) {
                    //Aprove this is Admin
                    $scope.Product.Pending = 1
                } else if ($rootScope.CurrentUser.UseType === 3) {
                    //pending this is Supplers
                    $scope.Product.Pending = 2
                }
                $scope.Product.GroupShowID = 0;
                console.log($scope.Product);

                return ProductRepository.Post($scope.Product).then(function (result) {
                    $scope.Product = result.data[0];
                    console.log(result.data);
                    aftersaved();
                });
            };

            var update = function () {
                $scope.Product.UserID = $rootScope.CurrentUser.UserID;
                if ($rootScope.CurrentUser.UseType === 1) {
                    //Aprove this is Admin
                    $scope.Product.Pending = 1;
                    $scope.Product.ProductState = 2;

                } else if ($rootScope.CurrentUser.UseType === 3) {
                    //pending this is Supplers
                    $scope.Product.Pending = 2
                }
                if ($scope.Isthereadiscount.yes === 2) {
                    $scope.Product.ProductPrice = '';
                }

                console.log($scope.Product);
                return ProductRepository.Put($scope.Product).then(function (result) {
                    console.log(result);
                    $scope.Product = result.data[0];
                    console.log($scope.Product);
                    aftersaved();
                });
            };
            return isEditMode ? update() : create();

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function AddEditImages() {

            console.log($scope.Product);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Product/AddProductImage/AddProductImage.html',
                controller: 'AddProductImage',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Product: function () {
                        return $scope.Product
                    }

                }
            });

        }
    }
})();