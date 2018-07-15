/**
 * Created by Alex4Prog on 05/09/2017.
 */


(function () {
    'use strict';

    angular.module('App').controller('SellerProductManagment', SellerProductManagment);
    SellerProductManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter', '$rootScope',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'SellerStoreList', 'SellerStoreRepository'
    ];

    function SellerProductManagment($scope, $uibModal, alertify, $filter, $rootScope, dtOptionsBuilder, dtColumnDefBuilder, sellerStoreList, sellerStoreRepository) {

        $scope.SellerStoreList = sellerStoreList;
        console.log($scope.SellerStoreList);
        $scope.Lang = $rootScope.Languages;
        console.log($scope.Lang);


        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'asc'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>f>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>"
            );

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];



        $scope.Assgin = function (sellerStoreList) {
            var SellerStoreObj = angular.extend({}, sellerStoreList);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/SellerProduct/SellerProductAssign/SellerProductAssign.html',
                controller: 'SellerProductAssign',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    SellerStoreObj: function () {
                        return SellerStoreObj;
                    },
                    Lang:function () {
                        return $scope.Lang
                    }
                }
            });
        };


    }
})();