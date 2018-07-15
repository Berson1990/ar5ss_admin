/**
 * Created by Alex4Prog on 05/09/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('Data').factory('ProductPropoertyRepository', ProductPropoertyRepository);
    ProductPropoertyRepository.$inject = ['$http', 'Port'];

    function ProductPropoertyRepository($http, Port) {
        var url = Port.url + 'productproperty';
        var insert = Port.url + 'storeproperty';
        var update = Port.url + 'putproperty';
        var deletepro = Port.url + 'deleteproperty';
        var assign = Port.url + 'storevalue';
        var productvalue = Port.url + 'productvalue';
        var removeproperty = Port.url + 'deletevalue';
        var updateproperty = Port.url + 'putvalue';

        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url + '?lang=ar'

                }).then(function (response) {
                    // console.log(response);
                    return response.data;

                });
            },
            GetProperty: function (id) {
                return $http({
                    method: 'GET',
                    url: productvalue + '/' + id + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (property) {
                return $http({
                    method: 'Post',
                    url: insert + '?lang=ar',
                    data: property

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (property) {
                return $http({
                    method: 'Put',
                    url: update + '/' + property.ProductPropertyID + '?lang=ar',
                    data: property

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            PutValue: function (value) {
                return $http({
                    method: 'Put',
                    url: updateproperty + '/' + value.PropertyValueID + '?lang=ar',
                    data: value

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            assign: function (group) {
                console.log(group);
                return $http({
                    method: 'Post',
                    url: assign + '?lang=ar',
                    data: group

                }).success(function (data, status, headers, config) {
                    console.log(data);
                    return data;
                });
            },
            RemovePropoerty: function (proid) {
                return $http({
                    method: 'Delete',
                    url: removeproperty + '/' + proid

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Delete: function (Gid) {
                return $http({
                    method: 'Delete',
                    url: deletepro + '/' + Gid

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();