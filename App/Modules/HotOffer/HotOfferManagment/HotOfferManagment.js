/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('HotOfferManagment', HotOfferManagment);
    HotOfferManagment.$inject = [
        '$scope', '$uibModal',
        'alertify','$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'HotList','HotofferRepository'
    ];

    function HotOfferManagment($scope, $uibModal, alertify, $filter,dtOptionsBuilder, dtColumnDefBuilder, hotList,hotofferRepository) {
        $(function () {

            $('#FromDate').datetimepicker({
                format: 'YYYY-MM-DD',

            });
            $('#ToDate').datetimepicker({
                format: 'YYYY-MM-DD',

            });

        });
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
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>"
            );

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];


        function getGroupShow() {
            groupShowRepository.GetGroupShow().then(function (result) {
                console.log()
            })

        }
        $scope.AddEdit = function (hot, isEditMode) {
            var Hot = angular.extend({}, hot);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/HotOffer/HotOfferAddEdit/HotOfferAddEdit.html',
                controller: 'HotOfferAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Hot: function () {
                        return Hot;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });
            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var HotIds = _.map(hotList, 'HotOfferID');
                    var HotIndex = _.indexOf(HotIds, saved.HotOfferID);
                    $scope.HotList[HotIndex] = saved;
                    alertify.success('تم')
                }
                else {
                    $scope.HotList.push(saved);
                    alertify.success('تم')
                }
                console.log(saved);
            });
        };

        $scope.Assgin = function (hot) {
            var Hot = angular.extend({}, hot);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/HotOffer/AddProductForHotOffer/AddProductForHotOffer.html',
                controller: 'AddProductForHotOffer',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Hot: function () {
                        return Hot;
                    }
                }
            });
        };

        $scope.Delete = function (hotList) {
            console.log(hotList);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                  console.log(hotList.HotOfferId);
                    hotofferRepository.Delete(hotList.HotOfferId).then(function (result) {
                        console.log(result);
                        console.log(result.data.state);
                        if (result.data.state  === '400') {
                            $scope.HotList.splice($scope.HotList.indexOf(hotList), 1);
                            alertify.success($filter('translate')('Done'));
                        } else if(result.data.state === '404') {
                            alertify.error($filter('translate')('OperationComplex'));
                        }
                    });
                }, function () {
                    alertify.log('.تم الغاء العملية');
                });
        };
    }
})();