/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('Circulars', Circulars);
    Circulars.$inject = [
        '$scope', '$uibModal',
        'alertify', 'SuppliersRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'AdminCirculList'
    ];

    function Circulars($scope, $uibModal, alertify, suppliersRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, adminCirculList) {
        $scope.AdminCirculList = adminCirculList;
        console.log($scope.AdminCirculList);
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


        $scope.AddEdit = function (adminCirculList, isEditMode) {
            var AdminCirculList = angular.extend({}, adminCirculList);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/AdministrativeCirculars/AdministrativeCircularsAddEdit/AdministrativeCircularsAddEdit.html',
                controller: 'AdministrativeCircularsAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    AdminCirculListObj: function () {
                        return AdminCirculList;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var AdminCirculListIds = _.map(adminCirculList, 'ID');
                    var AdminCirculListIndex = _.indexOf(AdminCirculListIds, saved.ID);
                    $scope.AdminCirculList[AdminCirculListIndex] = saved;
                    alertify.success($filter('translate')('Done'))
                }
                else {
                    console.log(saved);
                    $scope.AdminCirculList.push(saved);
                    alertify.success($filter('translate')('Done'))
                }
                console.log(saved);
            });
        };
        $scope.Delete = function (adminCirculList) {
            console.log(adminCirculList);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    suppliersRepository.DeleteAdminCruals(adminCirculList.ID).then(function (result) {
                        alertify.success($filter('translate')('Done'));
                        return $scope.AdminCirculList.splice($scope.AdminCirculList.indexOf(adminCirculList), 1);
                    });
                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });
        };


    }
})();