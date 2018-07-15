/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SizeManagment', SizeManagment);
    SizeManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'SizeRepository', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'SizeList','Category'
    ];

    function SizeManagment($scope, $uibModal, alertify, sizeRepository, $filter, dtOptionsBuilder, dtColumnDefBuilder, sizeList,category) {
        $scope.Size = sizeList;
        console.log($scope.Size);
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


        $scope.AddEdit = function (size, isEditMode) {
            var Size = angular.extend({}, size);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Size/SizeAddEdit/SizeAddEdit.html',
                controller: 'SizeAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Sizeobj: function () {
                        return Size;
                    },
                    Category:function(){
                        return category
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var SizeIds = _.map(sizeList, 'SizeID');
                    var SizeIndex = _.indexOf(SizeIds, saved.SizeID);
                    $scope.Size[SizeIndex] = saved;
                    alertify.success($filter('translate')('Done'))
                }
                else {
                    console.log(saved);
                    $scope.Size.push(saved);
                    alertify.success($filter('translate')('Done'))
                }
                console.log(saved);
            });
        };
        $scope.Delete = function (size) {
            console.log(size);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    sizeRepository.Delete(size.SizeID).then(function (result) {
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                            return $scope.Size.splice($scope.Size.indexOf(sizeList), 1);

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