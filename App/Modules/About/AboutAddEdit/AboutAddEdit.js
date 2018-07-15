/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('AboutAddEdit', AboutAddEdit);
    AboutAddEdit.$inject = [
        '$scope', '$uibModalInstance','AboutRepostiory','Aboutobj', 'IsEditMode'
    ];

    function AboutAddEdit($scope, $uibModalInstance,aboutRepostiory, aboutobj, isEditMode) {

        $scope.Aboutobj = aboutobj;
        console.log($scope.Aboutobj);
        $scope.IsEditMode = isEditMode;

        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.Aboutobj);
                $uibModalInstance.close($scope.Aboutobj);
            };



            var update = function () {

                console.log($scope.Aboutobj);
                return aboutRepostiory.Put($scope.Aboutobj).then(function (result) {
                    $scope.Aboutobj = result.data[0];
                    aftersaved();
                });
            };
            return update()

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();