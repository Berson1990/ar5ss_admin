/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('CityAddEdit', CityAddEdit);
    CityAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'CityRepository', 'CityObj', 'IsEditMode'
    ];

    function CityAddEdit($scope, $uibModalInstance, cityRepository, cityObj, isEditMode) {

        $scope.CityObj = cityObj;
        console.log($scope.CityObj);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                $uibModalInstance.close($scope.CityObj);
            };

            var create = function () {

                return cityRepository.Post($scope.CityObj).then(function (result) {
                    $scope.CityObj = result.data;
                    aftersaved();
                });
            };

            var update = function () {
                console.log($scope.CityObj);
                return cityRepository.Put($scope.CityObj).then(function (result) {
                    $scope.CityObj = result.data[0];
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