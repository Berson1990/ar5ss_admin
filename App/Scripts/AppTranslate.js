(function () {
	'use strict';

	angular.module('App').config(['$translateProvider', function ($translateProvider) {

		$translateProvider.useSanitizeValueStrategy('escaped');

		$translateProvider
		 .useStaticFilesLoader({
		 	prefix: 'App/Translations/',
		 	suffix: '.json'
		 })
		 .preferredLanguage('ar')
		 .useLocalStorage()
		 .useMissingTranslationHandlerLog();
	}]);
})();