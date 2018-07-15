/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('HotAdsAddEdit', HotAdsAddEdit);
    HotAdsAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'HotAdsRepository', 'Hotobj', 'IsEditMode'
    ];

    function HotAdsAddEdit($scope, $uibModalInstance, hotAdsRepository, hotobj, isEditMode) {

        $scope.Hotobj = hotobj;
        console.log($scope.Hotobj);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.Hotobj)
                $uibModalInstance.close($scope.Hotobj);
            };

            var create = function () {
                $scope.Hotobj.Image = Image;
                return hotAdsRepository.Post($scope.Hotobj).then(function (result) {
                    $scope.Hotobj = result.data[0];
                    document.getElementById("HotAdsImage").src =''
                    aftersaved();
                });
            };

            var update = function () {
                if (typeof  Image === 'undefined') {
                    $scope.Hotobj.Image = '';
                } else {
                    $scope.Hotobj.Image = Image;
                }
                console.log($scope.Hotobj);
                return hotAdsRepository.Put($scope.Hotobj).then(function (result) {
                    $scope.Hotobj = result.data[0];
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