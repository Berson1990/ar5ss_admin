/**
 * Created by Alex4Prog on 19/07/2017.
 */
(function () {
    'use strict';

    angular.module('Data').factory('SalesRepository', SalesRepository);
    SalesRepository.$inject = ['$http', 'Port'];

    function SalesRepository($http, Port) {
        var salesreport = Port.url + 'sellsreports';
        var usersReport = Port.url + 'userReport';
        var SalesDashborad = Port.url + 'getsalesdashboard';
        var salesfillter = Port.url + 'filterReport';
        var salesbyBrand = Port.url + 'salesbybrand';
        var salesbyBrandFilter = Port.url + 'fillterSalesReport';
        var salesbyCategory = Port.url + 'salesCat';
        var salesbyCategoryFilter = Port.url + 'FilterCat';
        var salesbyProduct = Port.url + 'salesProduct';
        var FiltterProduct = Port.url + 'FiltterProduct';
        var filltersalesbyday = Port.url + 'filterslasebyday';
        var salesday = Port.url + 'salesbyday';
        var abstract = Port.url + 'abstractReport';
        var ar5sspresnt = Port.url + 'ar5sspresnt';
        var orderCash = Port.url + 'cashorder';
        var Eorder = Port.url + 'epaymentorder';
        var updatear5sspresntage = Port.url + 'updatear5sspresntage';
        var orderforsuppliers = Port.url + 'orderforsuppliers';
        var fillterorderforsuppliers = Port.url + 'fillterorderforsuppliers';
        var filltergetorderforsupplersepayment = Port.url + 'filltergetorderforsupplersepayment';
        var supplerorderepayment = Port.url + 'supplerorderepayment';


        return {
            SalesReport: function (data) {
                return $http({
                    method: 'Post',
                    url: salesreport,
                    data: data

                }).success(function (data, status, headers, config) {

                    return data;

                });
            },
            SalesReportAbastract: function (data) {
                return $http({
                    method: 'Post',
                    url: abstract,
                    data: data

                }).success(function (data, status, headers, config) {

                    return data;

                });
            },
            UsersReport: function (data) {
                return $http({
                    method: 'Post',
                    url: usersReport,
                    data: data

                }).success(function (data, status, headers, config) {

                    return data;

                });
            },
            SalesFilter: function (data) {
                return $http({
                    method: 'Post',
                    url: salesfillter,
                    data: data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            SalesFilterbyDay: function (data) {
                return $http({
                    method: 'Post',
                    url: filltersalesbyday,
                    data: data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            SalesBrandFilter: function (data) {
                return $http({
                    method: 'Post',
                    url: salesbyBrandFilter,
                    data: data
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    return data;
                });
            },
            SalesCategoryFilter: function (data) {
                return $http({
                    method: 'Post',
                    url: updatear5sspresntage,
                    data: data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            SupplersBilssFilter: function (data) {
                console.log(data);
                return $http({
                    method: 'Post',
                    url: fillterorderforsuppliers + '/' + data.SupplierID,
                    data: data
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    return data;
                });
            },
            SupplersBilssFilterEpayment: function (data) {
                console.log(data);
                return $http({
                    method: 'Post',
                    url: filltergetorderforsupplersepayment + '/' + data.SupplierID,
                    data: data
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    return data;
                });
            },
            UpdatePresentage: function (data) {
                return $http({
                    method: 'put',
                    url: updatear5sspresntage,
                    data: data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            SalesProductFilter: function (data) {
                return $http({
                    method: 'Post',
                    url: FiltterProduct,
                    data: data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            getSalesDash: function (data) {
                return $http({
                    method: 'Get',
                    url: SalesDashborad
                }).success(function (data, status, headers, config) {

                    return data;

                });
            }, SalesByDay: function (data) {
                return $http({
                    method: 'Get',
                    url: salesday
                }).success(function (data, status, headers, config) {

                    return data;

                });
            },
            getSalesByBrand: function (data) {
                return $http({
                    method: 'Get',
                    url: salesbyBrand
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            getSalesByCate: function (data) {
                return $http({
                    method: 'Get',
                    url: salesbyCategory
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            getSalesByProduct: function (data) {
                return $http({
                    method: 'Get',
                    url: salesbyProduct
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            ar5sspresnteg: function (data) {
                return $http({
                    method: 'Get',
                    url: ar5sspresnt
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            OrderCash: function (data) {
                return $http({
                    method: 'Post',
                    url: orderCash,
                    data:data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            EPaymentOrder: function (data) {
                return $http({
                    method: 'Post',
                    url: Eorder,
                    data:data
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            SuppliersOrder: function (SupplierID) {
                return $http({
                    method: 'Get',
                    url: orderforsuppliers + '/' + SupplierID
                }).success(function (data, status, headers, config) {

                    return data;
                });
            },
            SuppliersOrderEPayment: function (SupplierID) {
                return $http({
                    method: 'Get',
                    url: supplerorderepayment + '/' + SupplierID
                }).success(function (data, status, headers, config) {

                    return data;
                });
            }

        };
    }
})();