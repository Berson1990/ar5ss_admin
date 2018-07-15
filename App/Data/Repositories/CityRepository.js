/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('CityRepository', CityRepository);
    CityRepository.$inject = ['$http', 'Port'];

    function CityRepository($http, Port) {
        var url = Port.url;


        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url + 'getCity'

                }).then(function (response) {
                    return response.data;
                });
            },
            getSupplierCitySuploirt: function (UserID) {
                return $http({
                    method: 'GET',
                    url: url + 'supplierSupport' + '/' + UserID

                }).then(function (response) {
                    return response.data;
                });
            },

            Post: function (City) {
                return $http({
                    method: 'Post',
                    url: url + 'creatcity',
                    data: City
                });
            },
            Put: function (City) {
                return $http({
                    method: 'Put',
                    url: url + 'updatecity/' + City.CityID,
                    data: City
                });
            },
            addtomylist: function (data) {
                return $http({
                    method: 'post',
                    url: url +'addtomylist',
                    data: data

                });
            },

            removetomylist: function (data) {
                console.log(data);
                return $http({
                    method: 'delete',
                    url: url +'removetomylist' +'/'+ data,

                });
            }




        };
    }
})();