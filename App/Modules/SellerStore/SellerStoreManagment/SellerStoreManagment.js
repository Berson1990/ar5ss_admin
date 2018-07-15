/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SellerStoreManagment', SellerStoreManagment);
    SellerStoreManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'SellerStoreRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope', 'localStorageService','$state'
    ];

    function SellerStoreManagment($scope, $uibModal, alertify, sellerStoreRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, $rootScope, localStorageService,$state) {

        if ($rootScope.CurrentUser === null) {
            $rootScope.CurrentUser = localStorageService.cookie.get("LoginData");
            event.preventDefault();
            // $state.go('MasterSeller.SellerLogin');

        }


        getSellerStore();

        function getSellerStore() {
            return sellerStoreRepository.Get($rootScope.CurrentUser.UserID).then(function (sellerStoreList) {
                $scope.SellerStoreList = sellerStoreList;
                console.log($scope.SellerStoreList);
            });


        }

        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'asc'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>f>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];


        $scope.AddEdit = function (sellerStoreList, isEditMode) {
            var sellerStore = angular.extend({}, sellerStoreList);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/SellerStore/SellerStoreAddEdit/SellerStoreAddEdit.html',
                controller: 'SellerStoreAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    SellerObj: function () {
                        return sellerStore;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var SellerIds = _.map($scope.SellerStoreList, 'SellerID');
                    var SellerIndex = _.indexOf(SellerIds, saved.SellerID);
                    $scope.SellerStoreList[SellerIndex] = saved;
                    alertify.success($filter('translate')('Done'))
                }
                else {
                    console.log(saved);
                    $scope.SellerStoreList.push(saved);
                    alertify.success($filter('translate')('Done'))
                }
                console.log(saved);
            });
        };
        $scope.Delete = function (sellerStoreList) {
            console.log(sellerStoreList);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    sellerStoreRepository.DeleteSeller(sellerStoreList.SellerId).then(function (result) {
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                            return $scope.SellerStoreList.splice($scope.SellerStoreList.indexOf(sellerStoreList), 1);

                        } else if (result.data.state === 203) {
                            alertify.error($filter('translate')('OperationComplex'));
                        }
                    });
                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });
        };


    }
})();