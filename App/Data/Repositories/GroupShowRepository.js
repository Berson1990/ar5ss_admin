/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('Data').factory('GroupShowRepository', GroupShowRepository);
    GroupShowRepository.$inject = ['$http', 'Port'];

    function GroupShowRepository($http, Port) {
        var url = Port.url + 'getfroupshow';
        var insert = Port.url + 'setgroup';
        var update = Port.url + 'updategroup';
        var deleteg = Port.url + 'deletegroupshow';
        var assign = Port.url + 'assgin';
        var productgroup = Port.url + 'productGroupShow';
        var removegroup = Port.url + 'removeproductfromgroup';
        var setting  = Port.url + 'getsetting';
        var updateseting  = Port.url + 'groupsetting';


        return {
            GetGroupShow: function () {
                return $http({
                    method: 'GET',
                    url: url + '?lang=ar'

                }).then(function (response) {
                    // console.log(response);
                    return response.data;

                });
            },
            Getsetting: function () {
                return $http({
                    method: 'GET',
                    url: setting

                }).then(function (response) {
                    // console.log(response);
                    return response.data;

                });
            },
            productGroupShow: function (id) {
                return $http({
                    method: 'GET',
                    url: productgroup + '/' + id + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (cat) {
                return $http({
                    method: 'Post',
                    url: insert + '?lang=ar',
                    data: cat

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (group) {
                return $http({
                    method: 'Put',
                    url: update + '/' + group.GroupShowID + '?lang=ar',
                    data: group

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Putsetting: function (setting) {
                return $http({
                    method: 'Put',
                    url: updateseting + '/' + 1,
                    data: setting

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            RemoveGroupShow: function (proid) {
                return $http({
                    method: 'Put',
                    url: removegroup + '/' + proid

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            assign: function (group) {
                return $http({
                    method: 'Post',
                    url: assign + '?lang=ar',
                    data: group

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Delete: function (Gid) {
                return $http({
                    method: 'Delete',
                    url: deleteg + '/' + Gid

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();