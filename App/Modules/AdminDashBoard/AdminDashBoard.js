/**
 * Created by Alex4Prog on 11/06/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('AdminDashBoard', AdminDashBoard);
    AdminDashBoard.$inject = ['$scope', 'Record','localStorageService', '$rootScope'];

    function AdminDashBoard($scope, record ,localStorageService, $rootScope) {
        $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
        console.log($rootScope.CurrentUser);
        // console.log(record);
        // console.log(record.ClintNumber[0].ClintNumber);
        $scope.ClintNumber = record.ClintNumber[0].ClintNumber;
        $scope.ActiveUsers = record.ActiveUsers[0].IsActiveUsers;
        $scope.InActiveUsers = record.InActiveUsers[0].InActiveUsers;
        $scope.Employee = record.Employee[0].Employee;
        $scope.PendingPrdouct = record.PendingPrdouct[0].PendingProduct;
        $scope.ProductAprove = record.ProductAprove[0].AproveProduct;
        $scope.PendingOrders = record.PendingOrders[0].OrderPending;
        $scope.NumberOFOrders = record.NumberOFOrders[0].NumberOFOrders;
    }
})();