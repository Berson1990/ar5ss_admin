/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('AboutManagment', AboutManagment);
    AboutManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'AboutRepostiory', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'About'
    ];

    function AboutManagment($scope, $uibModal, alertify, aboutRepostiory, $filter, dtOptionsBuilder, dtColumnDefBuilder, about) {
        $scope.About = about;
        console.log($scope.About);
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


        $scope.AddEdit = function (about, isEditMode) {
            var About = angular.extend({}, about);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/About/AboutAddEdit/AboutAddEdit.html',
                controller: 'AboutAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Aboutobj: function () {
                        return About;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                console.log(saved);
                var AboutIds = _.map(about, 'AboutID');
                var AboutIndex = _.indexOf(AboutIds, saved.AboutID);
                $scope.About[0] = saved;
                alertify.success($filter('translate')('Done'))
            });
        };



    }
})();