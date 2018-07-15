/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('AddProductForHotOffer', AddProductForHotOffer);
    AddProductForHotOffer.$inject = [
        '$scope', '$uibModalInstance', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$filter',
        'HotofferRepository', 'Hot', 'LoockupsRepository'
    ];

    function AddProductForHotOffer($scope, $uibModalInstance, dtOptionsBuilder, dtColumnDefBuilder, $filter, hotofferRepository, hot, loockupsRepository) {
        console.log(hot);
        $scope.Hot = hot;
        console.log($scope.Hot);

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


        $scope.Save = function () {
            var create = function () {

                $scope.params = {
                    ProductID: $scope.Product.ProductID,
                    HotOfferID: $scope.Hot.HotOfferId
                };


                return hotofferRepository.assign($scope.params).then(function (result) {
                    console.log(result);
                    $scope.ProductGroup.push(result.data[0]);
                });
            };
            return create();
        };
        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        getProductName();

        function getProductName() {
            loockupsRepository.product().then(function (result) {
                $scope.Product = result;
                console.log($scope.Product);
            })
        }

        getprdouctforgrop();

        function getprdouctforgrop() {

            var id = $scope.Hot.HotOfferId;
            console.log(id);
            hotofferRepository.productGroupShow(id).then(function (result) {
                $scope.ProductGroup = result;
                console.log($scope.ProductGroup)
            })
        }

        $scope.Delete = function (productgroup) {
            console.log(productgroup);
            $scope.ProductGroup.splice($scope.ProductGroup.indexOf(productgroup), 1);
            hotofferRepository.RemoveGroupShow(productgroup.ProductID).then(function (result) {

                alertify.success($filter('translate')('Done'))
            })
        }

    }
})();