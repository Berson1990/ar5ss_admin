/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('SellerStoreRepository', SellerStoreRepository);
    SellerStoreRepository.$inject = ['$http', 'Port'];

    function SellerStoreRepository($http, Port) {
        var url = Port.url + 'seller';
        var post = Port.url + 'setSellerStore';
        var put = Port.url + 'updateSeller';
        var deletesize = Port.url + 'deletesellerstore';
        var assgin = Port.url + 'asginsllerproduct';
        var getproduct = Port.url + 'sellerproduct';
        var deleteproductfromstore = Port.url + 'deleteproductfromstore';
        return {
            Get: function (id) {
                return $http({
                    method: 'GET',
                    url: url + '/' + id + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            GetSellerProduct: function (storeid) {
                return $http({
                    method: 'GET',
                    url: getproduct + '/' + storeid + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (sellerstore) {
                return $http({
                    method: 'Post',
                    url: post + '?lang=ar',
                    data: sellerstore

                }).success(function (data, status, headers, config) {
                    console.log(data);
                    return data;

                });
            },
            assgin: function (data) {
                return $http({
                    method: 'Post',
                    url: assgin + '?lang=ar',
                    data: data

                }).success(function (data, status, headers, config) {
                    console.log(data);
                    return data;

                });
            },
            Put: function (sellerstore) {
                return $http({
                    method: 'Put',
                    url: put + '/' + sellerstore.SellerID + '/' + sellerstore.StoreID + '?lang=ar',
                    data: sellerstore

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Delete: function (ProductID,SellerPrductID) {
                return $http({
                    method: 'delete',
                    url: deleteproductfromstore + '/' + ProductID + '/' + SellerPrductID,


                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            DeleteSeller: function (SellerId) {
                return $http({
                    method: 'delete',
                    url: deletesize + '/' +SellerId


                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }


        };
    }
})();