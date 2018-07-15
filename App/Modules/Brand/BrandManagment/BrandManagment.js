/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('BrandManagment', BrandManagment);
    BrandManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'BrandRepositroy',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'BrandList'
    ];

    function BrandManagment($scope, $uibModal, alertify, BrandRepositroy, dtOptionsBuilder, dtColumnDefBuilder, brandList) {
        $scope.Brand = brandList;
        console.log($scope.Brand);
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


        $scope.BrandAddEdit = function (brand, isEditMode) {
            var Brand = angular.extend({}, brand);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Brand/BrandAddEdit/BrandAddEdit.html',
                controller: 'BrandAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Brand: function () {
                        return Brand;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var Ids = _.map(brandList, 'BrandID');
                    var Index = _.indexOf(Ids, saved.BrandID);
                    $scope.Brand[Index] = saved;
                    alertify.success('done')
                }
                else {
                    $scope.Brand.push(saved);
                    alertify.success('done')
                }
                console.log(saved);
            });
        };

        // $scope.StopSuppleris = function (supplliersList) {
        //     alertify.logPosition("top left");
        //     alertify.confirm(
        //         'هل انت متاكد من ايقاف المورد؟',
        //         function () {
        //
        //             suppliersRepository.Stop(supplliersList).then(function (result) {
        //                 if (result.data) {
        //                     console.log(result.data['0']);
        //                     if(result.data['0'].UserState === 1){
        //                         alertify.success('تم تفعيل المورد بنجاح');
        //                     }else{
        //                         alertify.success('تم ايقاف المورد بنجاح');
        //                     }
        //
        //                     var supplersIds = _.pluck(suppliersList, 'UserID');
        //                     var supplersIndex = _.indexOf(supplersIds, result.data[0].UserID);
        //                     $scope.supplliers[supplersIndex].UserState = result.data[0].UserState;
        //                     //alert('Data Deleted successfully');
        //                 } else {
        //                     //disabled if it in procedure
        //                     alertify.error('العملية التى تريد الغاءها مرتبطة بالعمليات');
        //                 }
        //             });
        //         }, function () {
        //             alertify.log('.تم الغاء العملية');
        //         });
        // }
    }
})();