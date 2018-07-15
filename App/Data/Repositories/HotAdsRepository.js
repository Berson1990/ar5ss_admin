/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('HotAdsRepository', HotAdsRepository);
    HotAdsRepository.$inject = ['$http', 'Port'];

    function HotAdsRepository($http, Port) {
        var url = Port.url + 'hotadds';
        var post = Port.url + 'inserthotadds';
        var put = Port.url + 'updatehotadds';
        var del = Port.url + 'deletehotadds';
        var ChangMove = Port.url + 'changemode';
        var getchangemode = Port.url + 'getchangemode';
        var assgincategoryorproduct = Port.url + 'assgincorp';

        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url

                }).then(function (response) {
                    return response.data;
                });
            },
            GetChangeMode: function () {
                return $http({
                    method: 'GET',
                    url: getchangemode

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (hot) {
                return $http({
                    method: 'Post',
                    url: post,
                    data: hot

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (hot) {
                return $http({
                    method: 'Put',
                    url: put + '/' + hot.HotAdsID,
                    data: hot

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Asggin: function (hot) {
                return $http({
                    method: 'Put',
                    url: assgincategoryorproduct+'/'+hot.HotAdsID ,
                    data: hot

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            ChangeMovee: function (hot) {
                return $http({
                    method: 'Put',
                    url: ChangMove ,
                    data: hot

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            delete: function (HotAdsID) {
                return $http({
                    method: 'delete',
                    url: del + '/' + HotAdsID,


                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();