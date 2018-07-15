/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('BrandRepositroy', BrandRepositroy);
    BrandRepositroy.$inject = ['$http', 'Port'];

    function BrandRepositroy($http, Port) {
        var url = Port.url + 'getBrand';
        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (brand) {
                return $http({
                    method: 'Post',
                    url: url,
                    data: brand

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (brand) {
                return $http({
                    method: 'Put',
                    url: url +'/'+ brand.BrandID,
                    data: brand

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Stop: function (brand) {
                return $http({
                    method: 'Put',
                    url: url + brand.BrandID,
                    data: sup

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();