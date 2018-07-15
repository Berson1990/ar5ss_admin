(function () {
    'use strict';

    angular.module('Data').factory('DepartmentRepository', DepartmentRepository);
    DepartmentRepository.$inject = ['$http','Port'];

    function DepartmentRepository($http,Port) {
    //   var port = 8080;  
      var url= 'http://localhost:'+Port.port+'/ALXFSEP/public/department'
//     var url = 'http://alxfsep.us-west-2.elasticbeanstalk.com/ALXFSEP/public/department'
        return {
           
            GetDepartment: function () {
                return $http({
                    method: 'GET',
                    url: url,

                }).then(function (response) {
                    return response.data;
                });
            },
            SaveNewDepartment: function (dep) {
                return $http({
                    method: 'Post',
                    url: url,
                    data: dep

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            SaveUpdatedDepartment: function (dep) {
                return $http({
                    method: 'Put',
                    url: url+'/'+ dep.DepartmentID,
                    data: dep

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            DeleteDepartment: function (departmentId) {
                return $http({
                    method: 'Delete',
                    url: url+'/'+ departmentId,
                    data: departmentId

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
        };
    }
})();