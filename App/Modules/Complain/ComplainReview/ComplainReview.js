/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('App').controller('ComplainReview', ComplainReview);
    ComplainReview.$inject = [
        '$scope', '$uibModalInstance','ComplainRepository','ComplinText',
    ];

    function ComplainReview($scope, $uibModalInstance,complainRepository,complinText ) {
        readit();

        function readit() {
           return complainRepository.ReadIT(complinText.ComplainId).then(function (result) {
               $scope.result =result
           })
        }

        $scope.ComplinText = complinText;

        $scope.Cancel = function () {
            $uibModalInstance.close($scope.result[0]);
        };
    }
})();