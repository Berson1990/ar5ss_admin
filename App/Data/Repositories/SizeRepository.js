/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('SizeRepository', SizeRepository);
    SizeRepository.$inject = ['$http', 'Port'];

    function SizeRepository($http, Port) {
        var url = Port.url + 'size';
        var sizerealted = Port.url + 'sizerealted';
        var post = Port.url + 'createsize';
        var put = Port.url + 'updatesize';
        var deletesize = Port.url + 'deletesize';
        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            SzieRelated: function (id) {
                return $http({
                    method: 'GET',
                    url: sizerealted + '/' + id + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (size) {
                return $http({
                    method: 'Post',
                    url: post + '?lang=ar',
                    data: size

                }).success(function (data, status, headers, config) {
                    console.log(data)
                    return data;

                });
            },
            Put: function (size) {
                return $http({
                    method: 'Put',
                    url: put + '/' + size.SizeID + '?lang=ar',
                    data: size

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Delete: function (SellerID) {
                return $http({
                    method: 'delete',
                    url: url + '/' + SellerID,
                    data: deletesize

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();