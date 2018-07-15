/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('AssginPrdouctOrCategory', AssginPrdouctOrCategory);
    AssginPrdouctOrCategory.$inject = [
        '$scope', '$uibModalInstance', 'LoockupsRepository',
        'HotAdsRepository', 'Hotobj', 'Category'
    ];

    function AssginPrdouctOrCategory($scope, $uibModalInstance, loockupsRepository, hotAdsRepository, hotobj, category) {

        $scope.Hotobj = hotobj;
        console.log($scope.Hotobj);
        $scope.Category = category
        $scope.Save = function () {
            console.log($scope.Hotobj);
            hotAdsRepository.Asggin($scope.Hotobj).then(function (result) {
                console.log(result);
                $uibModalInstance.close();
            })

        };
        getproduct()

        function getproduct() {
            loockupsRepository.product($scope.lang).then(function (result) {
                $scope.Product = result;
                console.log($scope.Product)

            });
        }


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();