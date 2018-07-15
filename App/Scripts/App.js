(function () {
    'use strict';

    angular.module('Data', []);
    angular.module('Data', []).factory('Port', function () {
        return {
            url: 'http://188.226.135.249/'
            // url: 'http://www.ar5ss.com/ar5ss/public/'
        }
    });
    angular.module("App", [
        'ui.router'
        , 'ui.bootstrap'
        , 'ngSanitize'
        , 'Data'
        , 'ngAnimate'
        , 'ui.select'
        , 'datatables'
        , 'datatables.bootstrap'
        , 'blockUI'
        , 'ngAlertify'
        , 'ngCookies'
        , 'pascalprecht.translate'
        , 'angularFileUpload'
        , 'LocalStorageModule'
        , "ng"
        , "ngAnimate"
        , "ngAria"
        , 'ngMaterial'
        // ,'nemLogging'
        // ,'uiGmapgoogle-maps'
        , 'chart.js'
        , 'ngMap'
        , 'angular.filter'
        , 'angularUtils.directives.dirPagination'
        , 'ngLocalStorage'


    ]);

//     angular.module("App", []).factory('HazMasterReturn',function(){
//		 return{
//             
//			 HazMasterReturn :{}
//		 }
//	 })

    angular.module('App').run(['$rootScope', '$state', '$timeout', 'localStorageService',
        function ($rootScope, $state, $timeout, localStorageService) {
            $rootScope.$on('$stateChangeStart', function (event) {

                $timeout(function () {
                    //     console.log(localStorageService.get("LoginData"));

                    // if ($rootScope.CurrentUser === null) {
                    //     $rootScope.CurrentUser = localStorageService.get("LoginData");
                    //     // event.preventDefault();
                    //     console.log($rootScope.CurrentUser);
                    //     // $state.go('Login');
                    // }

                });
            });
        }]);
})();