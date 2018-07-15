/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('CancledOrder', CancledOrder);
    CancledOrder.$inject = [
        '$scope', '$uibModalInstance', 'SuppliersRepository', 'OrderObj'
    ];

    function CancledOrder($scope, $uibModalInstance, suppliersRepository, orderObj) {
        $scope.OrderObj = orderObj;


        $scope.Save = function () {

            var aftersaved = function () {
                $uibModalInstance.close();
            };

            var mapdParams = {
                OrderID: $scope.OrderObj.OrderID,
                RefusedReason: $scope.RefusedReason
            };
            console.log(mapdParams);
            return suppliersRepository.CancelOrder(mapdParams).then(function (result) {
                console.log(result);

                aftersaved();
            });


        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();