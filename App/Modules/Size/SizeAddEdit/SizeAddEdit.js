/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SizeAddEdit', SizeAddEdit);
    SizeAddEdit.$inject = [
        '$scope', '$uibModalInstance','SizeRepository','Sizeobj', 'IsEditMode','Category'
    ];

    function SizeAddEdit($scope, $uibModalInstance,sizeRepository, sizeobj, isEditMode,Category) {
        $scope.Category = Category;
        $scope.Size = sizeobj;
        console.log($scope.Size);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.Size);
                $uibModalInstance.close($scope.Size);
            };

            var create = function () {
                console.log($scope.Size);
                return sizeRepository.Post($scope.Size).then(function (result) {
                    console.log(result);
                    $scope.Size = result.data[0];

                    aftersaved();
                });
            };

            var update = function () {

                console.log($scope.Size);
                return sizeRepository.Put($scope.Size).then(function (result) {
                    console.log(result);
                    $scope.Size = result.data[0];
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