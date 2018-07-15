(function () {
	'use strict';

	angular.module('App').controller('AppController', AppController);
	AppController.$inject = [
		'$rootScope', '$scope', '$translate'
	];

	function AppController($rootScope, $scope, $translate) {

		$rootScope.CurrentUser = null;

		$rootScope.ChangeLanguage = function (lang) {
			$translate.use(lang);
		};

		$rootScope.Languages = [
			{ Lang: 'ar', Dir: 'rtl', CssClass: 'egypt-flag', Title: 'عربى' },
			{ Lang: 'en', Dir: 'ltr', CssClass: 'usa-flag', Title: 'English' }
		];

		$rootScope.$on('$translateChangeSuccess', function (event, data) {

			var language = data.language;
			$rootScope.lang = language;

			$rootScope.dir = (_.find($rootScope.Languages, function (row) {
				return (row.Lang === data.language);
			})).Dir;

			switch (data.language) {
				case 'ar':
					$('#siteCss').attr("href", "Static/assets_rtl/layouts/layout4/css/layout-rtl.min.css");
					$('#bootstrapCss').attr("href", "Static/assets_rtl/global/plugins/bootstrap/css/bootstrap-rtl.min.css");
					$('#siteThems').attr("href", "Static/assets_rtl/layouts/layout4/css/themes/light-rtl.min.css");
					$('#siteCustom').attr("href", "Static/assets_rtl/layouts/layout4/css/custom-rtl.min.css");
					$('#dataTablesCss').attr("href", "Static/Assets/css/dataTables.bootstrap-rtl.css");
					break;
				case 'en':
					$('#siteCss').attr("href", "Static/assets_ltr/layouts/layout4/css/layout.min.css");
					$('#bootstrapCss').attr("href", "Static/assets_ltr/global/plugins/bootstrap/css/bootstrap.min.css");
					$('#siteThems').attr("href", "Static/assets_rtl/layouts/layout4/css/themes/light.min.css");
					$('#siteCustom').attr("href", "Static/assets_rtl/layouts/layout4/css/custom.min.css");
					$('#dataTablesCss').attr("href", "Static/Vendors/DataTables-1.10.11/media/css/dataTables.bootstrap.min.css");
					break;
			}
		});
	}
})();