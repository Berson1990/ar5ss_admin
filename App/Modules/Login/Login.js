/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('Login', Login);
    Login.$inject = [
        '$scope',
        '$state',
        '$filter',
        'alertify',
        'SuppliersRepository',
        'localStorageService',
        '$rootScope'
    ];

    function Login($scope, $state, $filter, alertify, suppliersRepository, localStorageService, $rootScope) {


        console.log(localStorageService.cookie.get("LoginData"));
        $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
        console.log($rootScope.CurrentUser);
        if ($rootScope.CurrentUser === null) {
            console.log($rootScope.CurrentUser);
            $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
            // event.preventDefault();
            console.log($rootScope.CurrentUser);
            $state.go('Login');
        }else{
            if($rootScope.CurrentUser.UseType === 1 ){
                $state.go('Master.AdminDashBoard')
            }else{
                $state.go('Login');
            }

        }



        $scope.SginIn = function () {
            console.log($scope.login);
            if ($scope.login.Email === undefined && $scope.login.Password === undefined) {
                return alertify.error($filter('translate')('errorlogin'));
            }
            $scope.login.UseType = 1;
            console.log($scope.login);
            suppliersRepository.AdminLogin($scope.login).then(function (result) {
                if (result.data.success) {
                    $scope.logingDate = result.data.output[0];
                    console.log($scope.logingDate);
                    $rootScope.CurrentUser = $scope.logingDate;
                    console.log($rootScope);
                    // localStorageService.cookie.set("LoginData", $rootScope.CurrentUser)
                    localStorageService.cookie.set("LoginData", $rootScope.CurrentUser, "sessionStorage");
                    console.log(localStorageService.cookie.set("LoginData", $rootScope.CurrentUser, "sessionStorage"));
                    // console.log(localStorageService.cookie.set("LoginData", $rootScope.CurrentUser));
                    alertify.success(result.data.success);
                    $state.go('Master.AdminDashBoard');
                } else {
                    alertify.error(result.data.error)
                }
            })
        }



    }
})();