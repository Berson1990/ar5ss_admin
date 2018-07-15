/**
 * Created by Alex4Prog on 13/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ProductNumber', ProductNumber);
    ProductNumber.$inject = [
        '$scope', '$uibModalInstance',
        'SuppliersRepository', 'Supplirs',
    ];

    function ProductNumber($scope, $uibModalInstance, suppliersRepository, supplirs) {

        $scope.Supplirs = supplirs;

        suppliersRepository.GetProductForNumber($scope.Supplirs.UserID).then(function (result) {
            console.log(result)
            $scope.Number = result

        });

        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();