/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ModefiyProductQTY', ModefiyProductQTY);
    ModefiyProductQTY.$inject = [
        '$scope', '$uibModalInstance', 'ProductRepository', 'ProductObj'
    ];

    function ModefiyProductQTY($scope, $uibModalInstance, productRepository, productObj) {
        $scope.ProductObj = productObj;
        console.log($scope.ProductObj);
        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.ProductObj);
                $uibModalInstance.close($scope.ProductObj);
            };


            var curr_date = $scope.Date.getDate();
            var curr_month = $scope.Date.getMonth() +1 ;
            var curr_year = $scope.Date.getFullYear();

            var mapdparams = {
                ProductQTY: $scope.ProductObj.ProductQTY,
                ProductID: $scope.ProductObj.ProductID,
                Date:curr_year+'-'+curr_month+'-'+curr_date
            };
            console.log(mapdparams);
            return productRepository.PutQTY(mapdparams).then(function (result) {
                console.log(result);
                $scope.Size = result.data[0];
                aftersaved();
            });


        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();