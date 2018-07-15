/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('GroupSetting', GroupSetting);
    GroupSetting.$inject = [
        '$scope', '$uibModalInstance','alertify',
        'GroupShowRepository'
    ];

    function GroupSetting($scope, $uibModalInstance, alertify,groupShowRepository) {

        var aftersaved = function () {
            $uibModalInstance.close();
        };

        $scope.Save = function () {


            return groupShowRepository.Putsetting($scope.data).then(function (result) {
                $scope.Group = result.data['0'];
                aftersaved();
                alertify.success('Done');
            });


        };

        getsetting();

        function getsetting() {
            return groupShowRepository.Getsetting().then(function (result) {
                console.log(result);
                $scope.data = result[0];

            })
        };
        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }
})();