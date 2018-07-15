/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('CategoryManagment', CategoryManagment);
    CategoryManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'CategoryRepository',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'CategoryList'
    ];

    function CategoryManagment($scope, $uibModal, alertify, categoryRepository, dtOptionsBuilder, dtColumnDefBuilder, categoryList) {
        $scope.Category = categoryList;
        console.log($scope.Category);
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            // .withOption('order', [1, 'desc'])
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


        $scope.CategroyAddEdit = function (category, isEditMode) {
            var Category = angular.extend({}, category);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/Category/CategoryAddEdit/CategoryAddEdit.html',
                controller: 'CategoryAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Category: function () {
                        return Category;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var categoryIds = _.map(categoryList, 'CategoryID');
                    var categoryIndex = _.indexOf(categoryIds, saved.CategoryID);
                    $scope.Category[categoryIndex] = saved;
                    alertify.success('done')
                }
                else {
                    $scope.Category.push(saved);
                    alertify.success('done')
                }
                console.log(saved);
            });
        };

        $scope.Hide = function(Categorylist){

           return categoryRepository.Hide(Categorylist.CategoryID).then(function (result) {
               return $scope.Category.splice($scope.Category.indexOf(Categorylist), 1);


            })
        }

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