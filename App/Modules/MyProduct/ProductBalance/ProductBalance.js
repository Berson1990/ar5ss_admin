/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ProductBalance', ProductBalance);
    ProductBalance.$inject = [
        '$scope', '$uibModalInstance', 'ProductRepository', 'ProductObj', '$rootScope'
    ];

    function ProductBalance($scope, $uibModalInstance, productRepository, productObj, $rootScope) {
        $scope.ProductObj = productObj;
        console.log($scope.ProductObj);

        productRepository.ProductFinalQTY($scope.ProductObj.ProductID, $scope.ProductObj.StoreID, $scope.ProductObj.Date, $rootScope.CurrentUser.UserID).then(function (result) {

            $scope.ItemsQTY = result.data[0].ItemsQTY;
            console.log($scope.ItemsQTY);
            $scope.Final = $scope.ProductObj.ProductQTY - $scope.ItemsQTY;
            console.log($scope.Final)
        });


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();