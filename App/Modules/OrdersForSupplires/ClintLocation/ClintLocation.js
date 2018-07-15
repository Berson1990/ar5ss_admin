/**
 * Created by Alex4Prog on 29/08/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('ClintLocation', ClintLocation);
    ClintLocation.$inject = [
        '$scope', '$uibModalInstance', 'Location', '$timeout'
    ];

    function ClintLocation($scope, $uibModalInstance, location, $timeout) {

        $scope.Location  =  location;
        console.log($scope.Location);
        $timeout(function () {
            google.maps.event.trigger($scope.map, 'resize');
        }, 500);


        $scope.latitude = location.latitude;
        $scope.longitude = location.longitude;
        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }
})();