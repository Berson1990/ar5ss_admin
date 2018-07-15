/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('AdministrativeCircularsAddEdit', AdministrativeCircularsAddEdit);
    AdministrativeCircularsAddEdit.$inject = [
        '$scope', '$uibModalInstance','SuppliersRepository','AdminCirculListObj', 'IsEditMode'
    ];

    function AdministrativeCircularsAddEdit($scope, $uibModalInstance,suppliersRepository, adminCirculListObj, isEditMode) {


        $scope.AdminCirculListObj = adminCirculListObj;
        console.log($scope.AdminCirculListObj);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.AdminCirculListObj);
                $uibModalInstance.close($scope.AdminCirculListObj);
            };

            var create = function () {
                console.log($scope.AdminCirculListObj);
                return suppliersRepository.SetAdminCruals($scope.AdminCirculListObj).then(function (result) {
                    console.log(result);
                    $scope.AdminCirculListObj = result.data;

                    aftersaved();
                });
            };

            var update = function () {

                console.log($scope.AdminCirculListObj);
                return suppliersRepository.PutAdminCruals($scope.AdminCirculListObj).then(function (result) {
                    console.log(result);
                    $scope.AdminCirculListObj = result.data[0];
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