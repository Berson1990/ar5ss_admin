/**
 * Created by Alex4Prog on 29/08/2017.
 */
/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('Data').factory('HotofferRepository', HotofferRepository);
    HotofferRepository.$inject = ['$http', 'Port'];

    function HotofferRepository($http, Port) {
        var url = Port.url + 'gethotoffer';
        var insert = Port.url + 'sethotoffer';
        var update = Port.url + 'updatehot';
        var deleteg = Port.url + 'deleteghotoffer';
        var assign = Port.url + 'addhotoffer';
        var productgroup = Port.url + 'productHot';
        var removegroup = Port.url + 'removeproductfromhot';

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
            productGroupShow: function (hotOfferID) {

                return $http({
                    method: 'GET',
                    url: productgroup + '/' + hotOfferID + '?lang=ar'

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
                    console.log(data);
                    return data;
                });
            },
            Put: function (group) {
                return $http({
                    method: 'Put',
                    url: update + '/' + group.HotOfferId + '?lang=ar',
                    data: group

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
                console.log(group);
                return $http({
                    method: 'Post',
                    url: assign + '?lang=ar',
                    data: group

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Delete: function (HotofferId) {
                console.log(HotofferId);
                return $http({
                    method: 'Delete',
                    url: deleteg + '/' + HotofferId

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }
        };
    }
})();