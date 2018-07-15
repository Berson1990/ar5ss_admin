/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SupplierCity', SupplierCity);
    SupplierCity.$inject = [
        '$scope', '$uibModal',
        'alertify', 'CityRepository',
        'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope', 'SuppliersRepository'
    ];

    function SupplierCity($scope, $uibModal, alertify, cityRepository, dtOptionsBuilder, dtColumnDefBuilder, $rootScope, suppliersRepository) {
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


        getCity();

        function getCity() {
            return suppliersRepository.getCity().then(function (result) {
                $scope.City = result;
                console.log($scope.City);
            });
        }


        SupplierSupport();

        function SupplierSupport() {

            cityRepository.getSupplierCitySuploirt($rootScope.CurrentUser.UserID).then(function (result) {
                console.log(result);
                $scope.CityList = result
            })
        }

        $scope.AddorRemoveCity = function () {




            var mabdparams = {
                SupplierID: $rootScope.CurrentUser.UserID,
                CityID: $scope.City.CityID
            };
            console.log(mabdparams);
            cityRepository.addtomylist(mabdparams).then(function (result) {
                console.log(result.data);
                $scope.CityList.push(result.data[0]);
                alertify.success('Done');
            });

        };


        $scope.removeCity = function (city) {

            return cityRepository.removetomylist(city.ID).then(function (result) {

                $scope.CityList.splice($scope.CityList.indexOf(city), 1);
                alertify.success('Done');

            })
        }


    }
})();