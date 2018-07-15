/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('CompalinAdd', CompalinAdd);
    CompalinAdd.$inject = [
        '$scope', '$uibModalInstance', 'ComplainRepository', 'ComplainObj','IsEditMode','$rootScope'
    ];

    function CompalinAdd($scope, $uibModalInstance, complainRepository, complainObj,isEditMode,$rootScope) {
        $scope.complainObj = complainObj;
        $scope.IsEditMode = isEditMode;
        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.complainObj);
                $uibModalInstance.close($scope.complainObj);
            };

            var create = function () {
                $scope.complainObj.UserID = $rootScope.CurrentUser.UserID;
                console.log($scope.complainObj);
                return complainRepository.Post($scope.complainObj).then(function (result) {
                    console.log(result);
                    $scope.complainObj = result.data;

                    aftersaved();
                });
            };

            var update = function () {

                console.log($scope.Size);
                return complainRepository.Put($scope.complainObj).then(function (result) {
                    console.log(result);
                    $scope.complainObj = result.data[0];
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