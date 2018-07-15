/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SellerLogin', SellerLogin);
    SellerLogin.$inject = [
        '$scope',
        '$state',
        '$filter',
        'alertify',
        'SuppliersRepository',
        'localStorageService',
        '$rootScope',
        // 'localStorage'
    ];

    function SellerLogin($scope, $state, $filter, alertify, suppliersRepository, localStorageService, $rootScope) {

        console.log(localStorageService.cookie.get("LoginData"));
        $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
        console.log($rootScope.CurrentUser);
        if ($rootScope.CurrentUser === null) {

            console.log($rootScope.CurrentUser);
            $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
            // event.preventDefault();
            console.log($rootScope.CurrentUser);
            // $state.go('SellerLogin');
        }else{
            // $state.go('MasterSeller.SellerDashboard')
        }






        $scope.SginIn = function () {

            if ($scope.login.Email === undefined && $scope.login.Password === undefined) {
                return alertify.error($filter('translate')('errorlogin'));
            }
            $scope.login.UseType = 3;

            suppliersRepository.AdminLogin($scope.login).then(function (result) {


                if (result.data.success) {

                    $scope.LoginData = result.data.output[0];
                    console.log($scope.LoginData);
                    $rootScope.CurrentUser = $scope.LoginData;
                    console.log($rootScope.CurrentSeller);
                    localStorageService.cookie.set("LoginData", $rootScope.CurrentUser);
                    console.log(localStorageService.cookie.set("LoginData", $rootScope.CurrentUser));
                    alertify.success(result.data.success);
                    $state.go('MasterSeller.SellerDashboard');


                } else {

                    alertify.error(result.data.error)
                }
            })
        }
    }
})();