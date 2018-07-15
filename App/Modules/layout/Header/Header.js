/**
 * Created by Alex4Prog on 11/06/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('Header', Header);
    Header.$inject = ['$scope', 'localStorageService','$localStorage' ,'$rootScope', '$state','$window'];

    function Header($scope, localStorageService,$localStorage ,$rootScope, $state,$window) {
        $scope.Admin = 'Admin';
        localStorageService.cookie.get("LoginData");

        // if ($rootScope.CurrentUser === undefined) {
        //     $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
        //     // event.preventDefault();
        //     console.log($rootScope.CurrentUser);
        //     $state.go('Login');
        // }

        console.log($rootScope);
        if ($rootScope.CurrentUser === null) {
            console.log($rootScope.CurrentUser);
            $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
            // event.preventDefault();
            console.log($rootScope.CurrentUser);
            $state.go('Login');
        }



        $scope.LogOut = function () {

            // $rootScope.CurrentUser = null;
            // localStorageService.cookie.set("LoginData", $rootScope.CurrentUser);
            // $localStorage.remove($rootScope.CurrentUser);
            // console.log($localStorage.remove($rootScope.CurrentUser))
            var remove = localStorageService.cookie.remove("LoginData");
            console.log(remove);
            $rootScope.CurrentUser = null;

            $state.go('Login');

        }
    }
})();