/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('BrandAddEdit', BrandAddEdit);
    BrandAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'BrandRepositroy', 'Brand', 'IsEditMode'
    ];

    function BrandAddEdit($scope, $uibModalInstance, brandRepositroy, brand, isEditMode) {

        $scope.Brand = brand;
        console.log($scope.Brand);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                $uibModalInstance.close($scope.Brand);
            };

            var create = function () {
                $scope.Brand.Logo = Logo;
                return brandRepositroy.Post($scope.Brand).then(function (result) {
                    $scope.Brand = result.data[0];
                    aftersaved();
                });
            };

            var update = function () {
                if (typeof  Logo === 'undefined') {
                    $scope.Brand.Logo = '';
                } else {
                    $scope.Brand.Logo = Logo;
                }
                console.log($scope.Brand);
                return brandRepositroy.Put($scope.Brand).then(function (result) {
                    $scope.Brand = result.data[0];
                    aftersaved();
                });
            };
            return isEditMode ? update() : create();

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();