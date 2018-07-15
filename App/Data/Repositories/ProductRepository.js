/**
 * Created by Alex4Prog on 20/07/2017.
 */

(function () {
    'use strict';

    angular.module('Data').factory('ProductRepository', ProductRepository);
    ProductRepository.$inject = ['$http', 'Port'];

    function ProductRepository($http, Port) {
        var url = Port.url + 'product';
        var url2 = Port.url;
        var getproductcolor = Port.url;
        var insertImageslink = Port.url + 'insertnewImage';
        var allproduct = Port.url + 'allproduct';
        var deleteImage = Port.url + 'deleteImage';
        var getPropertyProduct = Port.url + 'getPropertyforCategory';
        var deleteproductAdmin = Port.url + 'deleteproductAdmin';
        var alert = Port.url + 'alert';
        // var productunderupdate = Port.url + 'productunderupdate';

        return {

            Get: function (id) {
                return $http({
                    method: 'GET',
                    url: url2 + 'getProductManagment/' + id + '?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },
            GetVAT: function (id) {
                return $http({
                    method: 'GET',
                    url: 'https://api.ar5ss.com/public/api/getvat',
                }).then(function (response) {
                    return response.data;
                });
            },
            modfiyvatapi: function (data) {
                return $http({
                    method: 'Put',
                    url: 'https://api.ar5ss.com/public/updatevat/1',
                    data:data
                }).then(function (response) {
                    return response.data;
                });
            },
            Alert: function (id) {
                return $http({
                    method: 'GET',
                    url: alert + '/' + id
                }).then(function (response) {
                    return response.data;
                });
            },
            ALLPRODUCT: function (id) {
                return $http({
                    method: 'GET',
                    url: allproduct + '?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },
            ProductUnderUpdate: function (id) {
                return $http({
                    method: 'GET',
                    url: url2 + 'productunderupdate/' + id + '?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },
            ProductUnderAdd: function (id) {
                return $http({
                    method: 'GET',
                    url: url2 + 'productaddadd/' + id + '?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },
            MyProduct: function (id) {
                return $http({
                    method: 'GET',
                    url: url2 + 'myproduct/' + id + '?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },

            GetPendingPrdouct: function () {
                return $http({
                    method: 'GET',
                    url: url2 + 'getpendingProduct?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },
            GetPropertyForProduct: function (categoryid) {
                return $http({
                    method: 'GET',
                    url: getPropertyProduct + '/' + categoryid + '?lang=ar'
                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (pro) {
                return $http({
                    method: 'Post',
                    url: url,
                    data: pro

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            insertImages: function (proimg) {

                return $http({
                    method: 'Post',
                    url: insertImageslink,
                    data: proimg

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            getFinalProductListQTY: function (productList) {
                console.log(productList);
                return $http({
                    method: 'Post',
                    url: url2 + 'getFinalProductQTY',
                    data: productList

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (pro) {
                console.log(pro);
                return $http({
                    method: 'Put',
                    url: url + '/' + pro.ProductID,
                    data: pro

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            AproveProduct: function (ProductID) {
                console.log(ProductID)
                return $http({
                    method: 'Put',
                    url: url2 + 'aproveproduct' + '/' + ProductID,


                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            PutQTY: function (data) {
                console.log(data);
                return $http({
                    method: 'Put',
                    url: url2 + 'updateproductqty' + '/' + data.ProductID,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            ProductFinalQTY: function (ProductID, StoreID, Date, userid) {

                return $http({
                    method: 'get',
                    url: url2 + 'finalproductqty' + '/' + ProductID + '/' + StoreID + '/' + Date + '/' + userid,


                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            UpdateProductForAntherMonthe: function (ProductID) {
                console.log(ProductID);
                return $http({
                    method: 'Put',
                    url: url2 + 'updateproductforanthermonthe' + '/' + ProductID,


                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Delete: function (pro) {
                return $http({
                    method: 'Delete',
                    url: url + '/' + pro.ProductID,
                    data: pro

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            DeleteImage: function (pro, procolorid) {
                return $http({
                    method: 'Delete',
                    url: deleteImage + '/' + pro + '/' + procolorid,
                    data: pro

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            DeletePendingProduct: function (productid) {
                return $http({
                    method: 'Delete',
                    url: url2 + 'deleteproduct' + '/' + productid,


                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            DeleteProduct: function (productid) {
                return $http({
                    method: 'Delete',
                    url: deleteproductAdmin + '/' + productid,


                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            getImageofProductwithHisColor: function (id) {
                console.log(id);
                return $http({
                    method: 'GET',
                    url: getproductcolor + 'productimage' + '/' + id
                }).then(function (response) {
                    return response.data;
                });

            }
        };
    }
})();