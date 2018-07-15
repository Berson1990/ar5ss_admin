/**
 * Created by Alex4Prog on 20/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ProductImage', ProductImage);
    ProductImage.$inject = [
        '$scope', '$uibModalInstance',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'ProductRepository', 'Product', 'LoockupsRepository'
    ];

    function ProductImage($scope, $uibModalInstance, dtOptionsBuilder, dtColumnDefBuilder, productRepository, product, loockupsRepository) {


        $scope.Product = product;
        console.log($scope.Product);

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


        getImagesWithColor();
        getColor();

        function getImagesWithColor() {
            productRepository.getImageofProductwithHisColor($scope.Product.ProductID).then(function (result) {
                $scope.ProductColor = result;
                console.log($scope.ProductColor)

            })
        }

        function getColor() {
            loockupsRepository.getColor().then(function (result) {
                $scope.Color = result;
                console.log($scope.Color);
            })
        }

        $scope.Save = function () {
            if ($scope.Product.ColorID === undefined) {
                $scope.Product = {
                    Image: photo,
                    ProductID: $scope.Product.ProductID,
                    ColorID: 5
                };
                console.log($scope.Product);
            } else {
                $scope.Product = {
                    Image: photo,
                    ProductID: $scope.Product.ProductID,
                    ColorID: $scope.Product.ColorID
                };
                console.log('1')
            }


            console.log($scope.Product);
            return productRepository.insertImages($scope.Product).then(function (result) {
                $scope.ProductColor = result.data;
                console.log(result.data);

            })
        };
        $scope.deleteImage = function (proclor) {
            console.log(proclor);
            console.log(proclor.product_image[0].ImageID);
            return productRepository.DeleteImage(proclor.product_image[0].ImageID, proclor.ProductColorID).then(function (result) {

                $scope.ProductColor.splice($scope.ProductColor.indexOf(proclor), 1);

            })
        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
