/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('AdminDashboardRepostiory', AdminDashboardRepostiory);
    AdminDashboardRepostiory.$inject = ['$http', 'Port'];

    function AdminDashboardRepostiory($http, Port) {
        var url = Port.url + 'lastAdminRecorede';
        return {
            Get: function () {
                return $http({
                    method: 'GET',
                    url: url

                }).then(function (response) {
                    return response.data;
                });
            },
        }
    }
})();