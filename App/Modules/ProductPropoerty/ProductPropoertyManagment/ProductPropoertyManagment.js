/**
 * Created by Alex4Prog on 05/09/2017.
 */


(function () {
    'use strict';

    angular.module('App').controller('ProductPropoertyManagment', ProductPropoertyManagment);
    ProductPropoertyManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter', '$rootScope',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'PropertyList', 'ProductPropoertyRepository'
    ];

    function ProductPropoertyManagment($scope, $uibModal, alertify, $filter, $rootScope, dtOptionsBuilder, dtColumnDefBuilder, propertyList, productPropoertyRepository) {

        $scope.PropertyList = propertyList;
        console.log($scope.PropertyList);
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


        $scope.AddEdit = function (property, isEditMode) {
            var Property = angular.extend({}, property);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/ProductPropoerty/ProductPropoertyAddEdit/ProductPropoertyAddEdit.html',
                controller: 'ProductPropoertyAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    PropertyObj: function () {
                        return Property;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    },
                    Lang:function () {
                        return $scope.Lang
                    }
                }
            });
            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var PropertyIds = _.map(propertyList, 'ProductPropertyID');
                    var PropertyIndex = _.indexOf(PropertyIds, saved.ProductPropertyID);
                    $scope.PropertyList[PropertyIndex] = saved;
                    alertify.success($filter('translate')('Done'))
                }
                else {
                    $scope.PropertyList.push(saved);
                    alertify.success($filter('translate')('Done'))
                }
                console.log(saved);
            });
        };

        $scope.Assgin = function (propety) {
            var Property = angular.extend({}, propety);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/ProductPropoerty/AssginProperty/AssginProperty.html',
                controller: 'AssginProperty',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    ProperyObj: function () {
                        return Property;
                    },
                    Lang:function () {
                        return $scope.Lang
                    }
                }
            });
        };

        $scope.Delete = function (propety) {
            console.log(propety);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    productPropoertyRepository.Delete(propety.ProductPropertyID).then(function (result) {
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                          return  $scope.PropertyList.splice($scope.PropertyList.indexOf(propety), 1);

                        } else if (result.data.state === 206) {
                            alertify.error($filter('translate')('OperationComplex'));
                        }
                    });
                }, function () {
                    alertify.log($filter('translate')('Cancel'));
                });
        };

        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            console.log(data.language);
            switch (data.language) {
                case'ar':
                    $scope.Lang = data.language;
                    break;
                case'en':
                    $scope.Lang = data.language;
                    break;
            }

        });
    }
})();