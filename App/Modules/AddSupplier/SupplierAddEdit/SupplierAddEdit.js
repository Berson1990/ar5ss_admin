/**
 * Created by Alex4Prog on 13/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SupplierAddEdit', SupplierAddEdit);
    SupplierAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'SuppliersRepository', 'Supplirs', 'IsEditMode'
    ];

    function SupplierAddEdit($scope, $uibModalInstance, suppliersRepository, supplirs, isEditMode) {

        $scope.Supplirs = supplirs;
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.Supplirs);
                $uibModalInstance.close($scope.Supplirs);
            };

            var create = function () {
                $scope.Supplirs.UseType = 3;
                 console.log($scope.Supplirs);
                return suppliersRepository.Post($scope.Supplirs).then(function (result) {
                    $scope.Supplirs = result.data[0];
                    aftersaved();
                });
            };

            var update = function () {
                console.log($scope.Supplirs)
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