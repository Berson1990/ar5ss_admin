/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('UsersReport', UsersReport);
    UsersReport.$inject = [
        '$scope',
        '$state',
        'alertify',
        'SalesRepository',
        '$rootScope',
        'DTOptionsBuilder', 'DTColumnDefBuilder'

    ];

    function UsersReport($scope, $state, alertify, salesRepository, $rootScope,dtOptionsBuilder, dtColumnDefBuilder) {


        $scope.UsersRport = {
            FromDate: new Date(),
            ToDate: new Date()
        };
        getData();
        function getData() {

            var today = new Date();
            var MontheBefore = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '-' + mm + '-' + dd;

            var dd2 = MontheBefore.getDate();
            var mm2 = MontheBefore.getMonth() - 1; //January is 0!
            var yyyy2 = MontheBefore.getFullYear();

            if (dd2 < 10) {
                dd2 = '0' + dd2
            }

            if (mm2 < 10) {
                mm2 = '0' + mm2
            }
            MontheBefore = yyyy2 + '-' + mm2 + '-' + dd2;

            salesRepository.UsersReport({
                FromDate: '2017-01-01',
                ToDate: new Date(),
            }).then(function (result) {
                $scope.SerachResult = result.data;
                console.log($scope.SerachResult)
            })
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

        $scope.search = function () {
            salesRepository.UsersReport($scope.UsersRport).then(function (result) {
                $scope.SerachResult = result.data;
                console.log($scope.SerachResult)
            })
        }


    }
})();