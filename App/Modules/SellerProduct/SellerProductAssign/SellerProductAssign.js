(function () {
    'use strict';

    angular.module('App').controller('SellerProductAssign', SellerProductAssign);
    SellerProductAssign.$inject = [
        '$scope', '$uibModalInstance', '$uibModal', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder',
        'SellerStoreRepository', 'SellerStoreObj', 'LoockupsRepository', 'Lang', '$rootScope'
    ];

    function SellerProductAssign($scope, $uibModalInstance, $uibModal, $filter, dtOptionsBuilder,
                                 dtColumnDefBuilder, sellerStoreRepository, sellerStoreObj, loockupsRepository, lang, $rootScope) {
        $scope.SellerStoreObj = sellerStoreObj;
        console.log($scope.SellerStoreObj.SellerID);
        console.log($scope.SellerStoreObj.StoreID);

        getVaules();
        $scope.lang = lang;

        // $scope.params = {
        //     ProductID: '',
        //     SellerID: $scope.SellerStoreObj.SellerID,
        //     StoreID: $scope.SellerStoreObj.StoreID,
        //     ProductQTY: '',
        //     Shiping: '',
        //     ShipingState: ''
        //
        // };

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
            if ($scope.ProductQTY === undefined) {
                return alertify.error('يجب ادخال كميه للمنتج')
            }
            // if ($scope.ProductQTY === undefined) {
            //     return alertify.error('يجب ادخال تاريخ ')
            // }

            var params = {
                ProductID: $scope.Product.ProductID,
                ProductQTY: $scope.ProductQTY,
                SellerID: $scope.SellerStoreObj.SellerID,
                Shiping: $scope.Shiping,
                ShipingState: $scope.ShipingState,
                SupplierID: $rootScope.CurrentUser.UserID,
                StoreID: $scope.SellerStoreObj.StoreID,
                Date:$scope.Date

            };
            console.log(params);

            return sellerStoreRepository.assgin(params).then(function (result) {
                console.log(result);
                console.log(result.data[0]);
                $scope.SellerProduct.push(result.data[0]);

            });

        };


        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        $scope.Delete = function (sellerProduct) {
            console.log(sellerProduct);


            sellerStoreRepository.Delete(sellerProduct.ProductID, sellerProduct.SellerPrductID).then(function (result) {
                console.log(result.data);
                if (result.data.state === 202) {
                    alertify.success($filter('translate')('Done'));
                    $scope.SellerProduct.splice($scope.SellerProduct.indexOf(sellerProduct), 1);
                } else if (result.data.state === 203) {
                    alertify.error($filter('translate')('OperationComplex'));
                }


            })
        };


        function getproduct() {
            loockupsRepository.productForUsers($rootScope.CurrentUser.UserID).then(function (result) {
                $scope.Product = result;
                console.log($scope.Product)

            });
        }


        function getVaules() {
            console.log($scope.SellerStoreObj.StoreID);
            sellerStoreRepository.GetSellerProduct($scope.SellerStoreObj.StoreID).then(function (result) {
                $scope.SellerProduct = result;
                console.log($scope.SellerProduct)
            })
        }

        getproduct();
    }
})();