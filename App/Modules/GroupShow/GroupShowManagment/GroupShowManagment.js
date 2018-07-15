/**
 * Created by Alex4Prog on 19/07/2017.
 */

(function () {
    'use strict';

    angular.module('App').controller('GroupShowManagment', GroupShowManagment);
    GroupShowManagment.$inject = [
        '$scope', '$uibModal',
        'alertify',
        'DTOptionsBuilder', 'DTColumnDefBuilder', 'GroupList','GroupShowRepository'
    ];

    function GroupShowManagment($scope, $uibModal, alertify, dtOptionsBuilder, dtColumnDefBuilder, groupList,groupShowRepository) {

        $scope.GroupList = groupList;
        console.log($scope.GroupList);

        $scope.dtOptions = dtOptionsBuilder.newOptions()
            .withOption('order', [1, 'asc'])
            .withBootstrap()
            .withPaginationType('full_numbers')
            .withLanguageSource('Static/Vendors/angular-1.4.8/i18n/angular-locale_ar.js')
            .withDOM(
                "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'l><T>f>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>"
            );

        $scope.dtColumnDefs = [
            dtColumnDefBuilder.newColumnDef(0).notSortable()
        ];


        function getGroupShow() {
            groupShowRepository.GetGroupShow().then(function (result) {
              console.log()
            })

        }
        $scope.AddEdit = function (group, isEditMode) {
            console.log(group);
            var Group = angular.extend({}, group);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/GroupShow/GroupShowAddEdit/GroupShowAddEdit.html',
                controller: 'GroupShowAddEdit',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Group: function () {
                        return group;
                    },
                    IsEditMode: function () {
                        return isEditMode;
                    }
                }
            });
            modalInstance.result.then(function (saved) {
                if (isEditMode) {

                    var GroupIds = _.map(groupList, 'GroupShowID');
                    var GroupIndex = _.indexOf(GroupIds, saved.GroupShowID);
                    $scope.GroupList[GroupIndex] = saved;
                    alertify.success('تم')
                }
                else {
                    $scope.GroupList.push(saved);
                    alertify.success('تم')
                }
                console.log(saved);
            });
        };

        $scope.Assgin = function (group) {
            var Group = angular.extend({}, group);
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/GroupShow/GroupShowAssiganProduct/GroupShowAssiganProduct.html',
                controller: 'GroupShowAssiganProduct',
                size: 'lg',
                windowClass: 'zindex',
                resolve: {
                    Group: function () {
                        return group;
                    }
                }
            });
        };

        $scope.Delete = function (grouplist) {
            console.log(grouplist);

            alertify.confirm(
                'هل انت متاكد من الحذف ',
                function () {
                    groupShowRepository.Delete(grouplist.GroupShowID).then(function (result) {
                        console.log(result.data.state);
                        if (result.data.state  === 400) {
                            $scope.GroupList.splice($scope.GroupList.indexOf(groupList), 1);
                            alertify.success('تم بنجاح');
                        } else if(result.data.state === 404) {
                            alertify.error('مرتبط بعمليات اخرى');
                        }
                    });
                }, function () {
                    alertify.log('.تم الغاء العملية');
                });
        };

        $scope.UpdateSetting = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'App/Modules/GroupShow/GroupSetting/GroupSetting.html',
                controller: 'GroupSetting',
                size: 'lg',
                windowClass: 'zindex',
            });

        }

    }
})();