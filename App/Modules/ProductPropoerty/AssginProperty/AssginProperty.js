(function () {
    'use strict';

    angular.module('App').controller('AssginProperty', AssginProperty);
    AssginProperty.$inject = [
        '$scope', '$uibModalInstance', '$uibModal', '$filter',
        'DTOptionsBuilder', 'DTColumnDefBuilder',
        'ProductPropoertyRepository', 'ProperyObj', 'LoockupsRepository', 'Lang'
    ];

    function AssginProperty($scope, $uibModalInstance, $uibModal, $filter, dtOptionsBuilder, dtColumnDefBuilder, productPropoertyRepository, properyObj, loockupsRepository, lang) {
        $scope.ProperyObj = properyObj;
        console.log($scope.ProperyObj.ProductPropertyID);

        getVaules();
        $scope.lang = lang;

        $scope.params = {
            ProductID: $scope.ProductID,
            ProductPropertyID: $scope.ProperyObj.ProductPropertyID,
            value: $scope.value,
            vaulee: $scope.vaulee
        };

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
                ProductPropertyID:$scope.ProperyObj.ProductPropertyID,
                value: $scope.value,
                valuee: $scope.valuee
            };
            console.log($scope.params);

            return productPropoertyRepository.assign($scope.params).then(function (result) {
                console.log(result);
                console.log(result.data[0]);
                $scope.PropertyValue.push(result.data[0]);

            });

        };
        // $scope.editValue = function (propertyValue) {
        //
        //     var Property = angular.extend({}, propertyValue);
        //     var modalInstance = $uibModal.open({
        //         templateUrl: 'App/Modules/ProductPropoerty/AssginPropertyAddEdit/AssginPropertyAddEdit.html',
        //         controller: 'AssginPropertyAddEdit',
        //         size: 'lg',
        //         windowClass: 'zindex',
        //         resolve: {
        //             PropertyObj: function () {
        //                 return Property;
        //             },
        //             Lang: function () {
        //                 return $scope.lang
        //             }
        //         }
        //     });
        //     modalInstance.result.then(function (saved) {
        //         var PropertyValueIds = _.pluck($scope.PropertyValue, 'PropertyValueID');
        //         var PropertyValueIndex = _.indexOf(PropertyValueIds, saved.PropertyValueID);
        //         $scope.PropertyValue[PropertyValueIndex] = saved;
        //         alertify.success($filter('translate')('Done'))
        //     });
        //
        //
        // };


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


        function getproduct() {
            loockupsRepository.product($scope.lang).then(function (result) {
                $scope.Product = result;
                console.log($scope.Product)

            });
        }


        function getVaules() {
            console.log($scope.ProperyObj.ProductPropertyID);
            productPropoertyRepository.GetProperty($scope.ProperyObj.ProductPropertyID).then(function (result) {
                $scope.PropertyValue = result;
            })
        }

         getproduct();
    }
})();