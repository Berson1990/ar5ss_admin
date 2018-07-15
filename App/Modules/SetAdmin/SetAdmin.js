(function () {
    'use strict';

    angular.module('App').controller('SetAdmin', SetAdmin);
    SetAdmin.$inject = [
        '$scope', '$uibModal',
        'alertify', 'SuppliersRepository','$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'SuppliersList'


    ];

    function SetAdmin($scope, $uibModal, alertify, suppliersRepository, $filter,dtOptionsBuilder, dtColumnDefBuilder, suppliersList) {
        console.log(suppliersList);
        $scope.supplliers = suppliersList;

        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'DESC'])
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


        $scope.SupplerAddEdit = function (supplirs, isEditMode) {
            var SupplerisEdit = angular.extend({}, supplirs);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/SetAdmin/EmploeeAddEdit/EmploeeAddEdit.html',
                controller: 'EmploeeAddEdit',
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

                    var supplierIDIds = _.map(suppliersList, 'UserID');
                    var supplierIndex = _.indexOf(supplierIDIds, saved.UserID);
                    $scope.supplliers[supplierIndex] = saved;
                    alertify.success('done')
                }
                else {
                    $scope.supplliers.push(saved);
                    alertify.success('done')
                }
                console.log(saved);
            });
        };


        $scope.setAdmin = function (supplliersList) {
            console.log(supplliersList);

            alertify.confirm(
               $filter('translate')('setAdmin'),
                function () {

                    suppliersRepository.SetAdmin(supplliersList).then(function (result) {
                        if (result.data) {
                            console.log(result.data);
                            if(result.data.state === 1){
                                alertify.success($filter('translate')('Done'));
                            }else if(result.data.state === 3){
                                alertify.success($filter('translate')('Done'));
                            }

                            var AdminIds = _.map(suppliersList, 'UserID');
                            var AdminIndex = _.indexOf(AdminIds, supplliersList.UserID);
                            $scope.supplliers[AdminIndex].UseType = result.data.state;

                        } else {
                            //disabled if it in procedure
                            alertify.error('العملية التى تريد الغاءها مرتبطة بالعمليات');
                        }
                    });
                }, function () {
                    alertify.log('.تم الغاء العملية');
                });
        };

        $scope.Delete = function (supplliersList) {
            console.log(supplliersList);

            alertify.confirm(
                $filter('translate')('Warning'),
                function () {
                    suppliersRepository.Delete(supplliersList.UserID).then(function (result) {
                        if (result.data.state === 202) {
                            alertify.success($filter('translate')('Done'));
                            return $scope.supplliers.splice($scope.supplliers.indexOf(supplliersList), 1);

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