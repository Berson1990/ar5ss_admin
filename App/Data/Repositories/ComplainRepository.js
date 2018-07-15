/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('ComplainRepository', ComplainRepository);
    ComplainRepository.$inject = ['$http', 'Port'];

    function ComplainRepository($http, Port) {
        var url = Port.url;

        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/api/Getcomplain'

                }).then(function (response) {
                    return response.data;
                });
            },
            GetMessage: function (state) {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/api/GetcomplainWithState/' + state

                }).then(function (response) {
                    return response.data;
                });
            },
            GetMessageSupplier: function (state) {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/api/GetcomplainWithStateSupplier/' + state

                }).then(function (response) {
                    return response.data;
                });
            },
            GetComplainSuppliers: function () {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/api/Getsupplierscomplain'
                }).then(function (response) {
                    return response.data;
                });
            },
            getSupplierComplain: function (supplierID) {
                return $http({
                    method: 'GET',
                    url: url + "api/getcompalinforonsupplier/" + supplierID

                }).then(function (response) {
                    return response.data;
                });
            },
            ReadIT: function (CompalinId) {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/readcompalin/' + CompalinId

                }).then(function (response) {
                    return response.data;
                });
            },
            PainIt: function (ComapinId) {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/moveup/' + ComapinId

                }).then(function (response) {
                    return response.data;
                });
            },
            removePain: function (ComapinId) {
                return $http({
                    method: 'GET',
                    url: 'http://ar5ss.com/removemoveup/' + ComapinId

                }).then(function (response) {
                    return response.data;
                });
            },
            getComplainforUser: function (userd) {
                return $http({
                    method: 'GET',
                    url: 'https://api.ar5ss.com/public/usercompalin/' + userd

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (Compailn) {
                return $http({
                    method: 'Post',
                    url: 'https://api.ar5ss.com/public/api/insertcomplain',
                    data: Compailn
                });
            },
            Put: function (Compailn) {
                return $http({
                    method: 'Put',
                    url: 'https://api.ar5ss.com/public/public/api/updateComplain/' + Compailn.ComplainId,
                    data: Compailn
                });
            },
            HideComplain: function (ComplainId) {
                console.log(ComplainId);
                return $http({
                    method: 'Put',
                    url: 'https://api.ar5ss.com/public/api/hidecom/' + ComplainId,
                });
            },
            delete: function (ComplainId) {
                return $http({
                    method: 'delete',
                    url: 'https://api.ar5ss.com/public/api/deleteComplain/' + ComplainId,

                });
            }


        };
    }
})();