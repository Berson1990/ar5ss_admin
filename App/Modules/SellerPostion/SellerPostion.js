/**
 * Created by Alex4Prog on 12/06/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SellerPostion', SellerPostion);
    SellerPostion.$inject = ['$scope', 'SellerPostionLocation','$timeout'];

    function SellerPostion($scope, sellerPostionLocation,$timeout) {
        console.log(sellerPostionLocation);
        $scope.Lat = 24.709181;
        $scope.Long = 46.586131;

        $scope.SellerPostionLocation = sellerPostionLocation;
        $timeout(function () {
            google.maps.event.trigger($scope.map, 'resize');
        }, 500);


        // $scope.latitude = location.SellerPostionLocation[0].latitude;
        // $scope.longitude = location.SellerPostionLocation[0].longitude;
    }
})();
