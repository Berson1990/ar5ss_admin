/**
 * Created by Alex4Prog on 11/06/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SellerDashBoard', SellerDashBoard);
    SellerDashBoard.$inject = ['$scope', 'SuppliersRepository', '$rootScope', '$state'];

    function SellerDashBoard($scope, suppliersRepository, $rootScope, $state) {
        getorder();

        function getorder() {
            suppliersRepository.AbstarctOrder($rootScope.CurrentUser.UserID).then(function (result) {
                console.log(result);
                $scope.NewOrder = result.NewOrder[0].NewOrder;
                $scope.PendingOrder = result.PendingOrder[0].PendingOrder;
                $scope.ClosedOrder = result.ClosedOrder[0].ClosedOrder;

                $scope.CanceldOrder = result.CanceldOrder.length;
                $scope.LateOrder = result.LateOrder[0].LateOrder;


            })

        }

    }
})();