(function () {
    'use strict';

    angular.module('App').controller('AssignPropertyforProduct', AssignPropertyforProduct);
    AssignPropertyforProduct.$inject = [
        '$scope', '$uibModalInstance', '$uibModal', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'ProductRepository',
        'ProductPropoertyRepository', 'Product', 'LoockupsRepository'
    ];

    function AssignPropertyforProduct($scope, $uibModalInstance, $uibModal, $filter, dtOptionsBuilder, dtColumnDefBuilder, productRepository, productPropoertyRepository, product, loockupsRepository) {
        $scope.Product = product;
        console.log(product);
        $scope.CategoryID = product.CategoryID;
        console.log($scope.Product.ProductID);

        getVaules();


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
            $scope.params = {
                ProductID: $scope.Product.ProductID,
                ProductPropertyID: $scope.ProductProperty.ProductPropertyID,
                value: $scope.value,
                vaulee: $scope.valuee
            };

            console.log($scope.params);

            return productPropoertyRepository.assign($scope.params).then(function (result) {
                console.log(result);
                console.log(result.data[0]);
                $scope.PropertyValue.push(result.data[0]);

            });

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        $scope.Delete = function (propertyValue) {
            console.log(propertyValue);
            $scope.PropertyValue.splice($scope.PropertyValue.indexOf(propertyValue), 1);
            productPropoertyRepository.RemovePropoerty(propertyValue.PropertyValueID).then(function (result) {
                alertify.success($filter('translate')('Done'))
            })
        };

        getPropertyOfThisProduct();

        function getPropertyOfThisProduct() {
            return productRepository.GetPropertyForProduct($scope.CategoryID).then(function (result) {
                $scope.ProductProperty = result;
                console.log($scope.ProductProperty)
            });
        }


        function getVaules() {
            console.log($scope.Product.ProductID);
            productPropoertyRepository.GetProperty($scope.Product.ProductID).then(function (result) {
                $scope.PropertyValue = result;
            })
        }


    }
})();