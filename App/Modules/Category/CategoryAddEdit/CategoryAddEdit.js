/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('CategoryAddEdit', CategoryAddEdit);
    CategoryAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'CategoryRepository', 'Category', 'IsEditMode'
    ];

    function CategoryAddEdit($scope, $uibModalInstance, categoryRepository, category, isEditMode) {

        $scope.Category = category;
        $scope.IsEditMode = isEditMode;

        // $(document).ready(function () {

        // });


        $scope.Save = function () {

            var aftersaved = function () {
                $uibModalInstance.close($scope.Category);
            };

            var create = function () {
                $scope.Category.CategoryImage = photo;
                console.log($scope.Category);
                return categoryRepository.Post($scope.Category).then(function (result) {
                    $scope.Category = result.data[0];
                    aftersaved();
                });
            };

            var update = function () {

                if (typeof  photo === 'undefined') {
                    $scope.Category.CategoryImage = '';
                } else  {
                    $scope.Category.CategoryImage = photo;
                }

                 console.log($scope.Category);
                return categoryRepository.Put($scope.Category).then(function (result) {
                    $scope.Category = result.data[0];
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