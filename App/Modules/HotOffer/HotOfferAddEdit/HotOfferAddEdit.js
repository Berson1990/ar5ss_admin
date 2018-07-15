/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('HotOfferAddEdit', HotOfferAddEdit);
    HotOfferAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'HotofferRepository','LoockupsRepository', 'Hot', 'IsEditMode'
    ];

    function HotOfferAddEdit($scope, $uibModalInstance, hotofferRepository,loockupsRepository, hot, isEditMode) {
        console.log(hot);
        $scope.Hot = hot;
        console.log($scope.Hot);
        // $scope.dt = new Date($scope.Hot.FromDate);
        // $scope.dt2 = new Date($scope.Hot.ToDate);




        if ($scope.Hot.FromDate && !($scope.Hot.FromDate instanceof Date)) {
            if (typeof $scope.Hot.FromDate === "string")
                $scope.Hot.FromDate = new Date($scope.Hot.FromDate);

        }
        if ($scope.Hot.ToDate && !($scope.Hot.ToDate instanceof Date)) {
            if (typeof $scope.Hot.ToDate === "string")
                $scope.Hot.ToDate = new Date($scope.Hot.ToDate);

        }

        $scope.IsEditMode = isEditMode;


        $scope.Save = function () {
            var aftersaved = function () {
                console.log($scope.Hot);
                $uibModalInstance.close($scope.Hot);
            };
            var create = function () {
                $scope.Hot.ProductID = $scope.Product.ProductID;
                console.log($scope.Hot);

                return hotofferRepository.Post($scope.Hot).then(function (result) {
                    console.log(result);
                    $scope.Hot = result.data[0];
                    aftersaved();
                });
            };
            var update = function () {
                $scope.Hot.ProductID = $scope.Product.ProductID;
                console.log($scope.Hot);
                return hotofferRepository.Put($scope.Hot).then(function (result) {

                    $scope.Hot = result.data[0];
                    console.log($scope.Hot);
                    aftersaved();
                });
            };
            return isEditMode ? update() : create();

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        getProductName();

        function getProductName() {
            loockupsRepository.product().then(function (result) {
                $scope.Product = result;
                console.log($scope.Product);
            })
        }


    }
})();