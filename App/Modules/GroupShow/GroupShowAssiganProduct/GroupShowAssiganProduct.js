(function () {
    'use strict';

    angular.module('App').controller('GroupShowAssiganProduct', GroupShowAssiganProduct);
    GroupShowAssiganProduct.$inject = [
        '$scope', '$uibModalInstance','$uibModal',
        'GroupShowRepository', 'Group', 'LoockupsRepository'
    ];

    function GroupShowAssiganProduct($scope, $uibModalInstance, $uibModal,groupShowRepository, group, loockupsRepository) {
        console.log(group);
        $scope.Group = group;
        console.log($scope.Group);


        $scope.Save = function () {
            $scope.params = {
                ProductID: $scope.Product.ProductID,
                GroupShowID: $scope.Group.GroupShowID
            };
            console.log($scope.params);

            return groupShowRepository.assign($scope.params).then(function (result) {
                // $scope.ProductGroup = result.data;
                console.log(result.data[0]);
                $scope.ProductGroup.push(result.data[0]);

            });

        };
        getProductName();
        function getProductName() {
            loockupsRepository.product().then(function (result) {
                $scope.Product = result;
                console.log()

            })

        }

        getprdouctforgrop();
        function getprdouctforgrop() {
            groupShowRepository.productGroupShow($scope.Group.GroupShowID).then(function (result) {

                $scope.ProductGroup = result;
                console.log($scope.ProductGroup)
            })
        }

        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.Delete = function (productgroup) {
            console.log(productgroup);
            $scope.ProductGroup.splice($scope.ProductGroup.indexOf(productgroup), 1);
            groupShowRepository.RemoveGroupShow(productgroup.ProductID).then(function (result) {

                alertify.success('تم بنجاح')
            })
        }



    }
})();