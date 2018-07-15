/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('HotAdsMangment', HotAdsMangment);
    HotAdsMangment.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'HotList',
        'HotAdsRepository', 'ChangeMode', 'Category'
    ];

    function HotAdsMangment($scope, $uibModal, alertify, $filter, dtOptionsBuilder, dtColumnDefBuilder, hotList, hotAdsRepository, ChangeMode, category) {
        $scope.cb2 = ChangeMode[0].Mode;

        if ($scope.cb2 === 1) {


            $scope.cb2 = 'تحريك'

        } else {

            $scope.cb2 = 'ايقاف'

        }


        console.log($scope.cb2);
        $scope.HotList = hotList;
        console.log($scope.HotList);
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


        $scope.Slider = function () {
            if ($scope.cb2 === 'تحريك') {

                var mapdparams = {
                    Mode: 1
                };
            } else {
                var mapdparams = {
                    Mode: 0
                };
            }
            console.log(mapdparams)
            return hotAdsRepository.ChangeMovee(mapdparams).then(function (result) {
                console.log(result)

            })
        };
        $scope.AddEdit = function (hot, isEditMode) {
            console.log();
            var Hot = angular.extend({}, hot);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/HotAds/HotAdsAddEdit/HotAdsAddEdit.html',
                controller: 'HotAdsAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Hotobj: function () {
                        return Hot;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var HotAdsIds = _.map(hotList, 'HotAdsID');
                    var HotAdsdex = _.indexOf(HotAdsIds, saved.HotAdsID);
                    $scope.HotList[HotAdsdex] = saved;
                    alertify.success($filter('translate')('Done'))
                }
                else {
                    $scope.HotList.push(saved);
                    alertify.success($filter('translate')('Done'))
                }
                console.log(saved);
            });
        };


        $scope.AssginProductOrCategory = function (hotList) {

            var Hot = angular.extend({}, hotList);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/HotAds/AssginPrdouctOrCategory/AssginPrdouctOrCategory.html',
                controller: 'AssginPrdouctOrCategory',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Hotobj: function () {
                        return Hot;
                    },
                    Category: function () {
                        return category;
                    }
                }
            });
            modalInstance.result.then(function (saved) {

                alertify.success($filter('translate')('Done'))


            });
        };

        $scope.Delete = function (hot) {
            console.log(hot);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    hotAdsRepository.delete(hot.HotAdsID).then(function (result) {
                        console.log(result);
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                            return $scope.HotList.splice($scope.HotList.indexOf(hot), 1);

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