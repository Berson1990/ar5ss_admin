/**
 * Created by Alex4Prog on 13/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('EmploeeAddEdit', EmploeeAddEdit);
    EmploeeAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'SuppliersRepository', 'Supplirs', 'IsEditMode'
    ];

    function EmploeeAddEdit($scope, $uibModalInstance, suppliersRepository, supplirs, isEditMode) {

        $scope.Supplirs = supplirs;
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                $uibModalInstance.close($scope.Supplirs);
            };

            var create = function () {
                $scope.Supplirs.UseType = 1;
                console.log($scope.Supplirs);
                return suppliersRepository.Post($scope.Supplirs).then(function (result) {
                    $scope.Supplirs = result.data;
                    aftersaved();
                });
            };

            var update = function () {


                return suppliersRepository.Put($scope.Supplirs).then(function (result) {
                    $scope.Supplirs = result.data;
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