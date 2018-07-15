(function () {
    'use strict';

    angular.module('App').controller('UserManagment', UserManagment);
    UserManagment.$inject = [
        '$scope', '$uibModal',
        'alertify', 'SuppliersRepository','$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'SuppliersList'


    ];

    function UserManagment($scope, $uibModal, alertify, suppliersRepository, $filter,dtOptionsBuilder, dtColumnDefBuilder, suppliersList) {
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
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];


        $scope.DisplayLocation = function (supplliersList) {
            console.log(supplliersList);
            var locat = angular.extend({}, supplliersList);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/UserManagment/UserLocation/UserLocation.html',
                controller: 'UserLocation',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Location: function () {
                        return locat;
                    },

                }
            });
        };
        $scope.ClintOrderLsit = function (supplliersList,orderstate) {

            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/UserManagment/ClintOrders/ClintOrders.html',
                controller: 'ClintOrders',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    UserID: function () {
                        return supplliersList.UserID;
                    },
                    orderstate: function () {
                        return orderstate;
                    },

                }
            });
        };
        $scope.ClintComplain = function (supplliersList) {

            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/UserManagment/ClintComplains/ClintComplains.html',
                controller: 'ClintComplains',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    UserID: function () {
                        return supplliersList.UserID;
                    }


                }
            });
        };


        $scope.StopSuppleris = function (supplliersList) {

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

                            var supplersIds = _.pluck(suppliersList, 'UserID');
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
        }
    }
})();