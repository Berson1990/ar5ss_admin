/**
 * Created by Alex4Prog on 29/08/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('UserLocation', UserLocation);
    UserLocation.$inject = [
        '$scope', '$uibModalInstance', 'Location', '$timeout'
    ];

    function UserLocation($scope, $uibModalInstance, location, $timeout) {

        $scope.Location  =  location.location;
        console.log($scope.Location);
        $timeout(function () {
            google.maps.event.trigger($scope.map, 'resize');
        }, 500);


        $scope.latitude = location.location[0].latitude;
        $scope.longitude = location.location[0].longitude;
        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }
})();