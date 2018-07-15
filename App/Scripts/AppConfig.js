(function () {
    'use strict';

    angular.module('App').config(["blockUIConfig", '$mdDateLocaleProvider',
        // 'uiGmapGoogleMapApiProvider',
        function (blockUiConfig, $mdDateLocaleProvider
                  // ,GoogleMapApiProviders
        ) {

            blockUiConfig.template = '<div class="spinner-overlay"></div><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div>';
            blockUiConfig.delay = 100;


            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('YYYY-MM-DD');
            };

            // GoogleMapApiProviders.configure({
            //     china: true
            // });
        }]);

    angular.module('App').config(["localStorageServiceProvider", function (localStorageServiceProvider) {


        localStorageServiceProvider
            .setPrefix('App')
            .setStorageType('sessionStorage')
            .setDefaultToCookie(true)
            .setStorageCookie(100, '/', false)
            .setNotify(true, true);

    }]);


})();