/**
 * Created by Alex4Prog on 11/06/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SellerHeader', SellerHeader);
    SellerHeader.$inject = ['$scope','localStorageService','$rootScope','$state','ProductRepository'];

    function SellerHeader($scope,localStorageService,$rootScope,$state,productRepository) {
        $scope.Admin = 'Admin';
        $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
        console.log($rootScope);

        if ($rootScope.CurrentUser === null) {
            $rootScope.CurrentUser = localStorageService.get("LoginData");
            event.preventDefault();
            console.log($rootScope.CurrentUser);
            $state.go('SellerLogin');
        }

        prdouctalert();
        function prdouctalert() {
            productRepository.Alert($rootScope.CurrentUser.UserID).then(function (result) {
                console.log(result);
                $scope.alert = result.data;
                console.log($scope.alert);

            })
        }

        $scope.LogOut = function () {

            // $rootScope.CurrentUser = null;
            // localStorageService.cookie.set("LoginData", $rootScope.CurrentUser);
            // $localStorage.remove($rootScope.CurrentUser);
            // console.log($localStorage.remove($rootScope.CurrentUser))
            var remove = localStorageService.cookie.remove("LoginData");
            console.log(remove);
            $rootScope.CurrentUser = null;

            $state.go('SellerLogin');

        }


        var pusher = new Pusher('712ec6266abad103ddee', {
            cluster: 'eu',
            encrypted: true
        });

    }
})();