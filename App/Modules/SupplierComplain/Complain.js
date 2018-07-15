/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SupplierComplain', SupplierComplain);
    SupplierComplain.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'ComplianList', 'ComplainRepository'
    ];

    function SupplierComplain($scope, $uibModal, alertify, $filter, dtOptionsBuilder, dtColumnDefBuilder, complianList, complainRepository) {
        $scope.complinlist = complianList;
        console.log($scope.complinlist);
        console.log($scope.About);
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

        $scope.ComplainReview = function (Complinlist) {
            var Complin = angular.extend({}, Complinlist);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Complain/ComplainReview/ComplainReview.html',
                controller: 'ComplainReview',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    ComplinText: function () {
                        return Complin;
                    },

                }
            });
            modalInstance.result.then(function (saved) {


                var Ids = _.map(complianList, 'ComplainId');
                var Index = _.indexOf(Ids, saved.ComplainId);
                $scope.complinlist[Index].IsRead = saved.IsRead;


            });
        };
        $scope.painit = function (Complinlist) {
            console.log(Complinlist);
            return complainRepository.PainIt(Complinlist.ComplainId).then(function (result) {
                console.log(result);
                $scope.complinlist = result;


            })
        };

        $scope.removepainit = function (Complinlist) {
            console.log(Complinlist);
            return complainRepository.removePain(Complinlist.ComplainId).then(function (result) {
                console.log(result);
                $scope.complinlist = result;


            })
        };

        $scope.getMesageSupplier = function (state) {

            complainRepository.GetMessageSupplier(state).then(function (result) {
                $scope.complinlist = result
            })
        };
        $scope.HideComplainUsers = function (Complinlist) {

            complainRepository.HideComplain(Complinlist.ComplainId).then(function (result) {
                alertify.success($filter('translate')('Done'));
                return $scope.complinlist.splice($scope.complinlist.indexOf(Complinlist), 1);

            })

        };


    }
})();