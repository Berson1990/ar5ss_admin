/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('ProductPropoertyAddEdit', ProductPropoertyAddEdit);
    ProductPropoertyAddEdit.$inject = [
        '$scope', '$uibModalInstance','$rootScope',
        'ProductPropoertyRepository', 'PropertyObj', 'IsEditMode','LoockupsRepository','Lang'
    ];

    function ProductPropoertyAddEdit($scope, $uibModalInstance, $rootScope,productPropoertyRepository, propertyObj, isEditMode,loockupsRepository,lang) {
        console.log(propertyObj);
        $scope.PropertyObj = propertyObj;
        $scope.IsEditMode = isEditMode;
        $scope.lang = lang;

        getCate();

        $scope.Save = function () {

            var aftersaved = function () {
                $uibModalInstance.close($scope.PropertyObj);
            };

            var create = function () {
                return productPropoertyRepository.Post($scope.PropertyObj).then(function (result) {
                    $scope.PropertyObj = result.data['0'];
                    aftersaved();
                });
            };

            var update = function () {
                console.log($scope.PropertyObj);
                return productPropoertyRepository.Put($scope.PropertyObj).then(function (result) {
                    $scope.PropertyObj = result.data['0'];
                    aftersaved();
                });
            };
            return isEditMode ? update() : create();

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

         function getCate() {
             loockupsRepository.getcat($scope.lang).then(function (result) {
                 $scope.Categroy = result

             })

        }

    }
})();