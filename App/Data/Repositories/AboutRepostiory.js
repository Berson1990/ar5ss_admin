/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('AboutRepostiory', AboutRepostiory);
    AboutRepostiory.$inject = ['$http', 'Port'];

    function AboutRepostiory($http, Port) {
        var url = Port.url + 'getAbout';
        var put = Port.url + 'updateAbout';
        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url +'?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            Put: function (about) {
                return $http({
                    method: 'Put',
                    url: put +'/'+ 1+'?lang=ar',
                    data: about

                }).success(function (data, status, headers, config) {
                    return data;
                });
            }
        };
    }
})();