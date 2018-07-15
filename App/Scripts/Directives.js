(function () {
	'use strict';


	angular.module('App').directive('sorting', [
		function () {
			return {
				restrict: 'A',
				transclude: true,
				template:
				  '<a ng-click="onClick()">' +
					'<span ng-transclude></span>' +
					'<i class="pull-right glyphicon" ng-class="GetSortedIcon()"></i>' +
				  '</a>',
				scope: {
					sortOrder: '=',
					sortBy: '=',
					sortField: '='
				},
				link: function (scope, element, attrs) {

					scope.onClick = function () {

						if (scope.sortField === scope.sortBy) {
							scope.sortOrder = (scope.sortOrder === "Asc") ? "Desc" : "Asc";
						} else {
							scope.sortField = scope.sortBy;
							scope.sortOrder = 'Desc';
						}
					}

					scope.GetSortedIcon = function () {
						if (scope.sortField !== scope.sortBy) {
							return 'glyphicon-sort';
						} else {
							return scope.sortOrder === "Asc" ? "glyphicon-sort-by-attributes" : "glyphicon-sort-by-attributes-alt";
						}
					};
				}
			};
		}
]);

		


	

})();