
/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('ColorReposiory', ColorReposiory);
    ColorReposiory.$inject = ['$http', 'Port'];
    function ColorReposiory($http, Port) {
        var url = Port.url;

        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url + 'getcolor'

                }).then(function (response) {
                    return response.data;
                });
            },

            Post: function (City) {
                return $http({
                    method: 'Post',
                    url: url + 'creatcolor',
                    data: City
                });
            },
            Put: function (City) {
                return $http({
                    method: 'Put',
                    url: url + 'updatecolor/' + City.ColorID,
                    data: City
                });
            },
            // delete: function (ComplainId) {
            //     return $http({
            //         method: 'delete',
            //         url: 'http:/188.226.135.249/api/deleteComplain/' + ComplainId,
            //
            //     });
            // }


        };
    }
})();