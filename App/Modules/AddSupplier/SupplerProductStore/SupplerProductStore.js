(function () {
    'use strict';

    angular.module('App').controller('SupplerProductStore', SupplerProductStore);
    SupplerProductStore.$inject = [
        '$scope', '$uibModalInstance', '$uibModal', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'SuppliersRepository', 'Supplirs'
    ];

    function SupplerProductStore($scope, $uibModalInstance, $uibModal, $filter, dtOptionsBuilder, dtColumnDefBuilder, suppliersRepository, supplirs) {
        $scope.supplers  =supplirs;
        getSupplersProduct();
        $scope.supplers = supplirs;
        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'asc'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>"
            );

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];

        function getSupplersProduct() {
            return suppliersRepository.GetSupplersProductStor($scope.supplers.UserID).then(function (result) {
                $scope.SupplersProduct = result;
                console.log($scope.SupplersProduct)

            })
        }


    }
})();