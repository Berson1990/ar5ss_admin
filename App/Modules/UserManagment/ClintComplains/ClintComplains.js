/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ClintComplains', ClintComplains);
    ClintComplains.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'UserID', 'ComplainRepository'
    ];

    function ClintComplains($scope, $uibModal, alertify, $filter, dtOptionsBuilder, dtColumnDefBuilder, userID, complainRepository) {
        $scope.dtOptions = dtOptionsBuilder.newOptions()
        // .withOption('order', [2, 'DESC'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'f><T>l>" +
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
        };
        $scope.painit = function (Complinlist) {
            return complainRepository.PainIt(Complinlist.ComplainId).then(function (result) {

            })
        };
        getCompainForClint();

        function getCompainForClint() {
            return complainRepository.getComplainforUser(userID).then(function (result) {
                $scope.complinlist = result

            })
        }


    }
})();