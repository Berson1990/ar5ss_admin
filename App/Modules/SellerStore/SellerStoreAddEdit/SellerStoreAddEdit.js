/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('SellerStoreAddEdit', SellerStoreAddEdit);
    SellerStoreAddEdit.$inject = [
        '$scope', '$uibModalInstance', 'SellerStoreRepository', 'SuppliersRepository', 'SellerObj', 'IsEditMode', 'NgMap', '$rootScope', 'localStorageService', '$timeout'
    ];

    function SellerStoreAddEdit($scope, $uibModalInstance, sellerStoreRepository, suppliersRepository, sellerObj, isEditMode, ngMap, $rootScope, localStorageService, $timeout) {

        $timeout(function () {
            google.maps.event.trigger($scope.map, 'resize');
        }, 500);


        console.log($rootScope.CurrentUser);
        $scope.SellerObj = sellerObj;
        console.log($scope.SellerObj);
        $scope.IsEditMode = isEditMode;

        getlocation();
        getCity();

        function getCity() {
            return suppliersRepository.getCity().then(function (result) {
                $scope.City = result;
                console.log($scope.City);
            });
        }

        function getlocation() {

            var Add = function () {

                $scope.Lat = 24.709181;
                $scope.Long = 46.586131;

            };
            var Edit = function () {

                $scope.Lat = $scope.SellerObj.Lat;
                $scope.Long = $scope.SellerObj.Long;

                console.log($scope.Lat, $scope.Long)

            };

            return isEditMode ? Edit() : Add();
        }


        $scope.showInfo = function (event) {
            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
            $scope.Lat = event.latLng.lat();
            $scope.Long = event.latLng.lng();
        };

        $scope.Save = function () {


            var aftersaved = function () {
                console.log($scope.SellerObj);
                $uibModalInstance.close($scope.SellerObj);
            };


            var create = function () {
                var mapdparams = {
                    UserID: $rootScope.CurrentUser.UserID,
                    Lat: $scope.Lat,
                    Long: $scope.Long,
                    name:$scope.SellerObj.name,
                    nameen:$scope.SellerObj.nameen,
                    Descrption:$scope.SellerObj.Descrption,
                    DescrptionEn:$scope.SellerObj.DescrptionEn,
                    CityID : $scope.SellerObj.CityID
                };

                if (mapdparams.name === undefined || mapdparams.nameen === undefined || mapdparams.Descrption === undefined || mapdparams.DescrptionEn === undefined) {
                    return alertify.error('يجب ادخال جميع الحقول')
                }

                console.log(mapdparams);
                return sellerStoreRepository.Post(mapdparams).then(function (result) {
                    $scope.SellerObj = result.data[0];
                    console.log($scope.SellerObj);
                    aftersaved();
                });
            };

            var update = function () {
                var mapdparms = {
                    UserID: $rootScope.CurrentUser.UserID,
                    SellerID: $scope.SellerObj.SellerID,
                    StoreID: $scope.SellerObj.StoreID,
                    Lat: $scope.Lat,
                    Long: $scope.Long,
                    name: $scope.SellerObj.name,
                    nameen: $scope.SellerObj.nameen,
                    Descrption: $scope.SellerObj.Descrption,
                    DescrptionEn: $scope.SellerObj.DescrptionEn,
                    CityID : $scope.SellerObj.CityID
                };
                console.log(mapdparms);

                return sellerStoreRepository.Put(mapdparms).then(function (result) {
                    console.log(result);
                    $scope.SellerObj = result.data[0];
                    aftersaved();
                });
            };
            return isEditMode ? update() : create();

        };

        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();