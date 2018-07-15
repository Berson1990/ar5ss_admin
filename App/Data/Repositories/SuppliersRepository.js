/**
 * Created by Alex4Prog on 18/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('SuppliersRepository', SuppliersRepository);
    SuppliersRepository.$inject = ['$http', 'Port'];

    function SuppliersRepository($http, Port) {
        var url = Port.url;
        var setadmin = Port.url + 'setUserToAdmin';
        var getadmin = Port.url + 'getadmin';
        var getCustomers = Port.url + 'getcustomers';
        var deleteEmployee = Port.url + 'removeEmployee';
        var getClintOrder = Port.url + 'clintorder';
        var suppplersStore = Port.url + 'suppliersStore';
        var supord = Port.url + 'supplersorders';
        var store = Port.url + 'getstore';
        var closeOrder = Port.url + 'closerder';
        var CancelOrder = Port.url + 'CancelOrder';
        var orderlate = Port.url + 'orderlate';
        var abstarctOrder = Port.url + 'abstarctOrders';
        var getcity = Port.url + 'getcity?lang=ar';
        var adminlateorder = Port.url + 'adminlateorder';
        var getadmincruals = Port.url + 'getadmincruals';
        var setadmincruals = Port.url + 'setadmincruals';
        var putadmincruals = Port.url + 'putadmincruals';
        var deleteadmincruals = Port.url + 'deleteadmincruals';
        var getsellerpostionurl = Port.url + 'sellerPosition';
        var budgetingurl = Port.url + 'budget';
        var clims = Port.url + 'clims';
        var budgtingsuppleris = Port.url + 'budgtingsuppleris';
        var productsuppliersell = Port.url + 'productsuppliersell';
        var abstractOrderSupplier = Port.url + 'abstractOrderSupplier';
        var abstractOrderSupplier2 = Port.url + 'abstractOrderSupplier2';
        var abstractOrderSupplier3= Port.url + 'abstractOrderSupplier3';
        var changefincorder = Port.url + 'changefincorder';
        var excutedOrders = Port.url + 'excutedOrders';
        var actualaccount = Port.url + 'actualaccount';
        var refusedorder = Port.url + 'refusedorder';


        return {
            GETSUP: function () {
                return $http({
                    method: 'GET',
                    url: url + 'suppliers'

                }).then(function (response) {
                    return response.data;
                });
            },
            GetProductForNumber: function (SupplierID) {
                return $http({
                    method: 'GET',
                    url: url + 'getsupplierProduct' + '/' + SupplierID

                }).then(function (response) {
                    return response.data;
                });
            },
            getCity: function () {
                return $http({
                    method: 'GET',
                    url:  url + 'getcity?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            AbstarctOrder: function (UserID) {
                return $http({
                    method: 'GET',
                    url: abstarctOrder + '/' + UserID

                }).then(function (response) {
                    return response.data;
                });
            },
            GETAdmin: function () {
                return $http({
                    method: 'GET',
                    url: getadmin

                }).then(function (response) {
                    return response.data;
                });
            },
            getCustompers: function () {
                return $http({
                    method: 'GET',
                    url: getCustomers

                }).then(function (response) {
                    return response.data;
                });
            },
            getStore: function (SellerID) {
                return $http({
                    method: 'GET',
                    url: store + '/' + SellerID + '?lang=ar'

                }).then(function (response) {
                    return response.data;
                });
            },
            CloseOrder: function (orderid, orderstate) {
                return $http({
                    method: 'GET',
                    url: closeOrder + '/' + orderid + '/' + orderstate

                }).then(function (response) {
                    return response.data;
                });
            },
            LateOrder: function (UserID) {
                return $http({
                    method: 'GET',
                    url: orderlate + '/' + UserID

                }).then(function (response) {
                    return response.data;
                });
            },
            GetSellerPostion: function () {
                return $http({
                    method: 'GET',
                    url: getsellerpostionurl

                }).then(function (response) {
                    return response.data;
                });
            },
            CancelOrder: function (Order) {
                return $http({
                    method: 'post',
                    url: CancelOrder + '/' + Order.OrderID,
                    data: Order

                }).then(function (response) {
                    return response.data;
                });
            },
            GetResentOrder: function (UserID, orderstate) {
                return $http({
                    method: 'GET',
                    url: getClintOrder + '/' + UserID + '/' + orderstate

                }).then(function (response) {
                    return response.data;
                });
            },
            GetOrderforSupplers: function (orderstate, UserID) {
                console.log(orderstate);
                console.log(UserID);
                return $http({
                    method: 'GET',
                    url: supord + '/' + orderstate + '/' + UserID

                }).then(function (response) {
                    return response.data;
                });
            },
            GetSupplersProductStor: function (UserID) {
                return $http({
                    method: 'GET',
                    url: suppplersStore + '/' + UserID

                }).then(function (response) {
                    return response.data;
                });
            },
            GetAadminCruals: function () {
                return $http({
                    method: 'GET',
                    url: getadmincruals

                }).then(function (response) {
                    return response.data;
                });
            },
            Post: function (sup) {
                return $http({
                    method: 'Post',
                    url: url + 'create',
                    data: sup

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            AdminLogin: function (login) {
                return $http({
                    method: 'Post',
                    url: url + 'loginadmin',
                    data: login

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            AdminLateOrder: function (data) {
                return $http({
                    method: 'Post',
                    url: adminlateorder,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            SetAdminCruals: function (data) {
                return $http({
                    method: 'Post',
                    url: setadmincruals,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            GetBudGeting: function (data) {
                return $http({
                    method: 'Post',
                    url: budgetingurl,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Clims: function (data) {
                return $http({
                    method: 'Post',
                    url: clims,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            GetBudGetingSupplier: function (data) {
                console.log(data);
                return $http({
                    method: 'Post',
                    url: budgtingsuppleris  ,
                    data : data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            GetProductSupplierSell: function (data) {
                return $http({
                    method: 'Post',
                    url: productsuppliersell  ,
                    data:data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            GetAbstarctSupplier: function (data) {
                return $http({
                    method: 'Post',
                    url: abstractOrderSupplier  ,
                    data:data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            GetAbstarctSupplier2: function (data) {
                return $http({
                    method: 'Post',
                    url: abstractOrderSupplier2,
                    data:data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            GetAbstarctSupplier3: function (data) {
                return $http({
                    method: 'Post',
                    url: abstractOrderSupplier3,
                    data:data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            ExcutedOrders: function (data) {
                return $http({
                    method: 'Post',
                    url: excutedOrders,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            ActualAccount: function (data) {
                return $http({
                    method: 'Post',
                    url: actualaccount,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Put: function (sup) {
                return $http({
                    method: 'Put',
                    url: url + 'updateSupliers/' + sup.UserID,
                    data: sup

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            SetAdmin: function (sup) {
                return $http({
                    method: 'Put',
                    url: setadmin + '/' + sup.UserID + '/' + sup.UseType,
                    data: sup

                }).success(function (data, status, headers, config) {
                    return data;
                });
            },
            Stop: function (sup) {
                return $http({
                    method: 'Put',
                    url: url + 'supllirsstate/' + sup.UserID,
                    data: sup

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            PutAdminCruals: function (data) {
                return $http({
                    method: 'Put',
                    url: putadmincruals + '/' + data.ID,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            ChangeFinicOrderState: function (data, state) {
                return $http({
                    method: 'Put',
                    url: changefincorder + '/' + data.OrderID + '/' + state,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            RefusedOrder: function (data) {
                return $http({
                    method: 'Put',
                    url: refusedorder + '/' + data.OrderID,
                    data: data

                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            Delete: function (UserID) {
                return $http({
                    method: 'Delete',
                    url: deleteEmployee + '/' + UserID
                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            },
            DeleteAdminCruals: function (ID) {
                return $http({
                    method: 'Delete',
                    url: deleteadmincruals + '/' + ID
                }).success(function (data, status, headers, config) {
                    return data.data;
                });
            }


        };
    }
})();