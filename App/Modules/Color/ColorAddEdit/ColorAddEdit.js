/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ColorAddEdit', ColorAddEdit);
    ColorAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'ColorReposiory', 'ColorObj', 'IsEditMode'
    ];

    function ColorAddEdit($scope, $uibModalInstance, colorReposiory, colorObj, isEditMode) {

        $scope.ColorObj = colorObj;
        console.log($scope.ColorObj);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                $uibModalInstance.close($scope.ColorObj);
            };

            var create = function () {

                return colorReposiory.Post($scope.ColorObj).then(function (result) {
                    $scope.ColorObj = result.data;
                    aftersaved();
                });
            };

            var update = function () {
                console.log($scope.ColorObj);
                return colorReposiory.Put($scope.ColorObj).then(function (result) {
                    $scope.ColorObj = result.data[0];
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