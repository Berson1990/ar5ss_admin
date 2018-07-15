(function () {
    'use strict';

    angular.module('App').controller('SupplierManagment', SupplierManagment);
    SupplierManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', '$filter', 'SuppliersRepository',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'SuppliersList'


    ];

    function SupplierManagment($scope, $uibModal, alertify, $filter, suppliersRepository, dtOptionsBuilder, dtColumnDefBuilder, suppliersList) {
        console.log(suppliersList);
        $scope.supplliers = suppliersList;

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


        $scope.SupplerAddEdit = function (supplirs, isEditMode) {
            var SupplerisEdit = angular.extend({}, supplirs);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/AddSupplier/SupplierAddEdit/SupplierAddEdit.html',
                controller: 'SupplierAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Supplirs: function () {
                        return SupplerisEdit;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var Ids = _.map(suppliersList, 'UserID');
                    var Index = _.indexOf(Ids, saved.UserID);
                    $scope.supplliers[Index] = saved;
                    alertify.success('done')
                }
                else {
                    $scope.supplliers.push(saved);
                    alertify.success('done')
                }
                console.log(saved);
            });
        };


        $scope.ShowSupplerProduct = function (supplirs) {
            var SupplerisEdit = angular.extend({}, supplirs);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/AddSupplier/SupplerProductStore/SupplerProductStore.html',
                controller: 'SupplerProductStore',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Supplirs: function () {
                        return SupplerisEdit;
                    },

                }
            });

        };

        $scope.StopSuppleris = function (supplliersList) {
            alertify.logPosition("top left");
            alertify.confirm(
                $filter('translate')('UserState'),
                function () {

                    suppliersRepository.Stop(supplliersList).then(function (result) {
                        if (result.data) {
                            console.log(result.data['0']);
                            if (result.data['0'].UserState === 1) {
                                alertify.success($filter('translate')('ActiveCustomers'));
                            } else {
                                alertify.success($filter('translate')('BlockCustomers'));
                            }

                            var supplersIds = _.map(suppliersList, 'UserID');
                            var supplersIndex = _.indexOf(supplersIds, result.data[0].UserID);
                            $scope.supplliers[supplersIndex].UserState = result.data[0].UserState;
                            //alert('Data Deleted successfully');
                        } else {
                            //disabled if it in procedure
                            alertify.error('العملية التى تريد الغاءها مرتبطة بالعمليات');
                        }
                    });
                }, function () {
                    alertify.log('.تم الغاء العملية');
                });
        };


        $scope.supplierproductnumber = function (supplliersList) {


            var SupplerisEdit = angular.extend({}, supplliersList);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/AddSupplier/ProductNumber/ProductNumber.html',
                controller: 'ProductNumber',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Supplirs: function () {
                        return SupplerisEdit;
                    },

                }
            });


        }
    }
})();