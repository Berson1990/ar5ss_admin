/**
 * Created by Alex4Prog on 20/07/2017.
 */
//LoockupsRepository
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('Data').factory('LoockupsRepository', LoockupsRepository);
    LoockupsRepository.$inject = ['$http', 'Port'];

    function LoockupsRepository($http, Port) {
        var cat = Port.url + 'category';
        var brand = Port.url + 'getBrand';
        var size = Port.url + 'size';
        var color = Port.url + 'color';
        var product = Port.url + 'Product';
        var category =Port.url +'cat';
        var users =Port.url +'getcustomers';
        var productforusers =Port.url +'productforusers';

        return {
            GetBrand: function () {
                return $http({
                    method: 'GET',
                    url: brand

                }).then(function (response) {
                    return response.data;
                });
            },
            GetCategory: function () {
                return $http({
                    method: 'GET',
                    url: cat

                }).then(function (response) {
                    return response.data;
                });
            },
            getcat: function (lang) {
                return $http({
                    method: 'GET',
                    url: cat+'?lang='+lang

                }).then(function (response) {
                    return response.data;
                });
            },
            GetSize: function () {
                return $http({
                    method: 'GET',
                    url: size

                }).then(function (response) {
                    return response.data;
                });
            },
            getColor: function () {
                return $http({
                    method: 'GET',
                    url: color

                }).then(function (response) {
                    return response.data;
                });
            },
            product: function (lang) {
                return $http({
                    method: 'GET',
                    url: product + '?lang='+lang

                }).then(function (response) {
                    return response.data;
                });
            },
            users: function (lang) {
                return $http({
                    method: 'GET',
                    url: users

                }).then(function (response) {
                    return response.data;
                });
            }    ,
            productForUsers: function (UserID) {
                return $http({
                    method: 'GET',
                    url: productforusers + '/' + UserID +'?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            }

        };
    }
})();