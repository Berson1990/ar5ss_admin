/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('Data').factory('CategoryRepository', CategoryRepository);
    CategoryRepository.$inject = ['$http', 'Port'];

    function CategoryRepository($http, Port) {
        var url = Port.url + 'category';
        var hide = Port.url + 'hidecategory';
        var url2 = Port.url;


        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url2+'cat?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (cat) {
                return $http({
                    method: 'Post',
                    url: url,
                    data: cat

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (cat) {
                return $http({
                    method: 'Put',
                    url: url2 + 'updatecategory/' + cat.CategoryID + '?lang=ar',
                    data: cat

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Hide: function (CategoryID) {
                return $http({
                    method: 'Put',
                    url: hide + '/' + CategoryID,


                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Stop: function (cat) {
                return $http({
                    method: 'Put',
                    url: url + '/' + cat.CategoryID,
                    data: cat

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();