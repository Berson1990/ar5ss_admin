/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SupplierAddComplain', SupplierAddComplain);
    SupplierAddComplain.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder','ComplainRepository','$rootScope'
    ];

    function SupplierAddComplain($scope, $uibModal, alertify, $filter, dtOptionsBuilder, dtColumnDefBuilder,complainRepository,$rootScope) {


        getComplain();

        function getComplain() {
            return complainRepository.getSupplierComplain($rootScope.CurrentUser.UserID).then(function (complianList) {
                $scope.complinlist = complianList;
                console.log($scope.complinlist);

            })
        }

        $scope.dtOptions = dtOptionsBuilder.newOptions()

        // .withOption('order', [2, 'DESC'])
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

        $scope.AddEdit = function (Complinlist,isEditMode) {
            var Complin = angular.extend({}, Complinlist);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/SupplierAddComplain/CompalinAdd/CompalinAdd.html',
                controller: 'CompalinAdd',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    ComplainObj: function () {
                        return Complin;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }

                }
            });
            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var ComplainIds = _.map($scope.complinlist, 'ComplainId');
                    var  ComplainIndex = _.indexOf(ComplainIds, saved.ComplainId);
                    $scope.complinlist[ComplainIndex] = saved;
                    alertify.success($filter('translate')('Done'))
                }
                else {
                    console.log(saved);
                    $scope.complinlist.push(saved);
                    alertify.success($filter('translate')('Done'))
                }
                console.log(saved);
            });

        };

        $scope.Delete = function (Complinlist) {
            console.log(Complinlist);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    complainRepository.delete(Complinlist.ComplainId).then(function (result) {
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                            return $scope.complinlist.splice($scope.complinlist.indexOf(Complinlist), 1);

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