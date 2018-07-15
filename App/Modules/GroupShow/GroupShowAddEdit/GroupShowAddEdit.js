/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('GroupShowAddEdit', GroupShowAddEdit);
    GroupShowAddEdit.$inject = [
        '$scope', '$uibModalInstance',
        'GroupShowRepository', 'Group', 'IsEditMode'
    ];

    function GroupShowAddEdit($scope, $uibModalInstance, groupShowRepository, group, isEditMode) {
console.log(group)
        $scope.Group = group;
        console.log($scope.Group);
        $scope.IsEditMode = isEditMode;


        $scope.Save = function () {

            var aftersaved = function () {
                $uibModalInstance.close($scope.Group);
            };

            var create = function () {
                return groupShowRepository.Post($scope.Group).then(function (result) {
                    $scope.Group = result.data['0'];
                    aftersaved();
                });
            };

            var update = function () {
                console.log($scope.Group);
                console.log($scope.Group);
                return groupShowRepository.Put($scope.Group).then(function (result) {
                    $scope.Group = result.data['0'];
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