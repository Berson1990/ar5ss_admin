(function () {
    'use strict';

    angular.module('App').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/HomePage");

        $stateProvider
            .state("Master", {
                    url: "/Master",
                    views: {
                        '': {
                            templateUrl: "App/Modules/layout/Master/Master.html",
                            controller: "Master",
                            data: {pageTitle: '', pageSubTitle: ''}
                        },
                        'Header@Master': {
                            templateUrl: 'App/Modules/layout/Header/Header.html',
                            controller: 'Header'
                        },
                        'SideBar@Master': {
                            templateUrl: 'App/Modules/layout/SideBar/SideBar.html',
                            controller: 'SideBar'
                        },
                        'Footer@Master': {
                            templateUrl: 'App/Modules/layout/Footer/Footer.html',
                            controller: 'Footer'
                        }
                    }
            })
            .state("MasterSeller", {
                url: "/MasterSeller",
                views: {
                    '': {
                        templateUrl: "App/Modules/SellerLayout/Master/Master.html",
                        controller: "Master",
                        data: {pageTitle: '', pageSubTitle: ''}
                    },
                    'Header@MasterSeller': {
                        templateUrl: 'App/Modules/SellerLayout/Header/Header.html',
                        controller: 'SellerHeader'
                    },
                    'SideBar@MasterSeller': {
                        templateUrl: 'App/Modules/SellerLayout/SideBar/SideBar.html',
                        controller: 'SellerSideBar'
                    },
                    'Footer@MasterSeller': {
                        templateUrl: 'App/Modules/SellerLayout/Footer/Footer.html',
                        controller: 'SellerFooter'
                    }
                }
            })

            .state("HomePage", {
                url: "^/HomePage",
                templateUrl: "App/Modules/HomePage/HomePage.html",
                controller: "HomePage"
            })
            .state("Login", {
                url: "^/Login",
                templateUrl: "App/Modules/Login/Login.html",
                controller: "Login"
            })
            .state("SellerLogin", {
                url: "^/SellerLogin",
                templateUrl: "App/Modules/SellerLogin/SellerLogin.html",
                controller: "SellerLogin"
            })
            .state("Master.Test", {
                url: "^/Test",
                templateUrl: "App/Modules/Test/Test.html",
                controller: "Test",
                data: {pageTitle: 'Home', pageSubTitle: ''}
            })
            .state("Master.SupplierManagment", {
                url: "^/SupplierManagment",
                templateUrl: "App/Modules/AddSupplier/SupplierManagment/SupplierManagment.html",
                controller: "SupplierManagment",
                data: {pageTitle: 'SupplierManagment', pageSubTitle: ''},
                resolve: {
                    SuppliersList: [
                        'SuppliersRepository', function (SuppliersRepository) {
                            return SuppliersRepository.GETSUP();
                        }
                    ]
                }
            })
            .state("Master.BrandManagment", {
                url: "^/BrandManagment",
                templateUrl: "App/Modules/Brand/BrandManagment/BrandManagment.html",
                controller: "BrandManagment",
                data: {pageTitle: 'BrandManagment', pageSubTitle: ''},
                resolve: {
                    BrandList: [
                        'BrandRepositroy', function (brandRepositroy) {
                            return brandRepositroy.Get();
                        }
                    ]
                }
            })
            .state("Master.VAT", {
                url: "^/VAT",
                templateUrl: "App/Modules/VAT/VAT.html",
                controller: "VAT",
                data: {pageTitle: 'VAT', pageSubTitle: ''},
                resolve: {
                    VAT: [
                        'ProductRepository', function (productRepository) {
                            return productRepository.GetVAT();
                        }
                    ]
                }
            })
            .state("Master.CategoryManagment", {
                url: "^/CategoryManagment",
                templateUrl: "App/Modules/Category/CategoryManagment/CategoryManagment.html",
                controller: "CategoryManagment",
                data: {pageTitle: 'CategoryManagment', pageSubTitle: ''},
                resolve: {
                    CategoryList: [
                        'CategoryRepository', function (categoryRepository) {
                            return categoryRepository.Get();
                        }
                    ]
                }
            })
            .state("Master.ProductManagment", {
                url: "^/ProductManagment",
                templateUrl: "App/Modules/Product/ProductManagment/ProductManagment.html",
                controller: "ProductManagment",
                data: {pageTitle: 'ProductManagment', pageSubTitle: ''},
                resolve: {

                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ]
                }
            })
            .state("Master.ProductState", {
                url: "^/ProductState",
                templateUrl: "App/Modules/ProductState/ProductState.html",
                controller: "ProductState",
                data: {pageTitle: 'ProductState', pageSubTitle: ''},
                resolve: {
                    ProductList: [
                        'ProductRepository', function (productRepository) {
                            return productRepository.GetPendingPrdouct();
                        }
                    ],
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ]

                }
            })
            .state("Master.GroupShowManagment", {
                url: "^/GroupShowManagment",
                templateUrl: "App/Modules/GroupShow/GroupShowManagment/GroupShowManagment.html",
                controller: "GroupShowManagment",
                data: {pageTitle: 'GroupShowManagment', pageSubTitle: ''},
                resolve: {
                    GroupList: [
                        'GroupShowRepository', function (groupShowRepository) {
                            return groupShowRepository.GetGroupShow();
                        }
                    ]
                }
            })
            .state("Master.HotOfferManagment", {
                url: "^/HotOfferManagment",
                templateUrl: "App/Modules/HotOffer/HotOfferManagment/HotOfferManagment.html",
                controller: "HotOfferManagment",
                data: {pageTitle: 'HotOfferManagment', pageSubTitle: ''},
                resolve: {
                    HotList: [
                        'HotofferRepository', function (hotofferRepository) {
                            return hotofferRepository.Get();
                        }
                    ]
                }
            })
            .state("Master.ProductPropoertyManagment", {
                url: "^/ProductPropoertyManagment",
                templateUrl: "App/Modules/ProductPropoerty/ProductPropoertyManagment/ProductPropoertyManagment.html",
                controller: "ProductPropoertyManagment",
                data: {pageTitle: 'ProductPropoertyManagment', pageSubTitle: ''},
                resolve: {
                    PropertyList: [
                        'ProductPropoertyRepository', function (productPropoertyRepository) {
                            return productPropoertyRepository.Get();
                        }
                    ]
                }
            })
            .state("Master.SizeManagment", {
                url: "^/SizeManagment",
                templateUrl: "App/Modules/Size/SizeManagment/SizeManagment.html",
                controller: "SizeManagment",
                data: {pageTitle: 'SizeManagment', pageSubTitle: ''},
                resolve: {
                    SizeList: [
                        'SizeRepository', function (sizeRepository) {
                            return sizeRepository.Get();
                        }

                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                }
            })
            .state("Master.AboutManagment", {
                url: "^/AboutManagment",
                templateUrl: "App/Modules/About/AboutManagment/AboutManagment.html",
                controller: "AboutManagment",
                data: {pageTitle: 'AboutManagment', pageSubTitle: ''},
                resolve: {
                    About: [
                        'AboutRepostiory', function (aboutRepostiory) {
                            return aboutRepostiory.Get();
                        }
                    ]
                }
            })
            .state("Master.HotAdsMangment", {
                url: "^/HotAdsMangment",
                templateUrl: "App/Modules/HotAds/HotAdsMangment/HotAdsMangment.html",
                controller: "HotAdsMangment",
                data: {pageTitle: 'HotAdsMangment', pageSubTitle: ''},
                resolve: {
                    HotList: [
                        'HotAdsRepository', function (hotAdsRepository) {
                            return hotAdsRepository.Get();
                        }
                    ],
                    ChangeMode: [
                        'HotAdsRepository', function (hotAdsRepository) {
                            return hotAdsRepository.GetChangeMode();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                }
            })

            .state("Master.SetAdmin", {
                url: "^/SetAdmin",
                templateUrl: "App/Modules/SetAdmin/SetAdmin.html",
                controller: "SetAdmin",
                data: {pageTitle: 'SetAdmin', pageSubTitle: ''},
                resolve: {
                    SuppliersList: [
                        'SuppliersRepository', function (SuppliersRepository) {
                            return SuppliersRepository.GETAdmin();
                        }
                    ]
                }
            })
            .state("Master.UserManagment", {
                url: "^/UserManagment",
                templateUrl: "App/Modules/UserManagment/UserManagment.html",
                controller: "UserManagment",
                data: {pageTitle: 'UserManagment', pageSubTitle: ''},
                resolve: {
                    SuppliersList: [
                        'SuppliersRepository', function (SuppliersRepository) {
                            return SuppliersRepository.getCustompers();
                        }
                    ]
                }
            })
            .state("Master.Complain", {
                url: "^/Complain",
                templateUrl: "App/Modules/Complain/Complain.html",
                controller: "Complain",
                data: {pageTitle: 'Complain', pageSubTitle: ''},
                resolve: {
                    ComplianList: [
                        'ComplainRepository', function (complainRepository) {
                            return complainRepository.Get();
                        }
                    ]
                }
            })
            .state("Master.AdministrativeCirculars", {
                url: "^/AdministrativeCirculars",
                templateUrl: "App/Modules/AdministrativeCirculars/AdministrativeCirculars.html",
                controller: "AdministrativeCirculars",
                data: {pageTitle: 'AdministrativeCirculars', pageSubTitle: ''},
                resolve: {
                    AdminCirculList: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GetAadminCruals();
                        }
                    ]
                }
            })
            .state("Master.SupplierComplain", {
                url: "^/SupplierComplain",
                templateUrl: "App/Modules/SupplierComplain/Complain.html",
                controller: "SupplierComplain",
                data: {pageTitle: 'SupplierComplain', pageSubTitle: ''},
                resolve: {
                    ComplianList: [
                        'ComplainRepository', function (complainRepository) {
                            return complainRepository.GetComplainSuppliers();
                        }
                    ]
                }
            })
            .state("Master.SalesReport", {
                url: "^/SalesReport",
                templateUrl: "App/Modules/SalesReport/SalesReport.html",
                controller: "SalesReport",
                data: {pageTitle: 'SalesReport', pageSubTitle: ''},
                resolve: {
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ],
                    Users: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.users();
                        }
                    ]

                }
            })
            .state("Master.SalesPendingReport", {
                url: "^/SalesPendingReport",
                templateUrl: "App/Modules/SalesPendingReport/SalesPendingReport.html",
                controller: "SalesPendingReport",
                data: {pageTitle: 'SalesPendingReport', pageSubTitle: ''},
                resolve: {
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ],
                    Users: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.users();
                        }
                    ]

                }
            })
            .state("Master.NewOrder", {
                url: "^/NewOrder",
                templateUrl: "App/Modules/NewOrder/NewOrder.html",
                controller: "NewOrder",
                data: {pageTitle: 'NewOrder', pageSubTitle: ''},
                resolve: {
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ],
                    Users: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.users();
                        }
                    ]

                }
            })
            .state("Master.ClosedOrder", {
                url: "^/ClosedOrder",
                templateUrl: "App/Modules/ClosedOrder/ClosedOrder.html",
                controller: "ClosedOrder",
                data: {pageTitle: 'ClosedOrder', pageSubTitle: ''},
                resolve: {
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ],
                    Users: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.users();
                        }
                    ]

                }
            })
            .state("Master.RefusedOrder", {
                url: "^/RefusedOrder",
                templateUrl: "App/Modules/RefusedOrder/RefusedOrder.html",
                controller: "RefusedOrder",
                data: {pageTitle: 'RefusedOrder', pageSubTitle: ''},
                resolve: {
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ],
                    Users: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.users();
                        }
                    ]

                }
            })
            .state("Master.AdminLateOrder", {
                url: "^/AdminLateOrder",
                templateUrl: "App/Modules/AdminLateOrder/AdminLateOrder.html",
                controller: "AdminLateOrder",
                data: {pageTitle: 'ADminLateOrder', pageSubTitle: ''},
                resolve: {
                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ],
                    Users: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.users();
                        }
                    ]

                }
            })

            .state("Master.UsersReport", {
                url: "^/UsersReport",
                templateUrl: "App/Modules/UsersReport/UsersReport.html",
                controller: "UsersReport",
                data: {pageTitle: 'UsersReport', pageSubTitle: ''}

            })

            .state("Master.DashBord", {
                url: "^/DashBord",
                templateUrl: "App/Modules/DashBord/DashBord.html",
                controller: "DashBord",
                data: {pageTitle: 'DashBord', pageSubTitle: ''},
                resolve: {
                    SalesDash: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.getSalesDash();
                        }
                    ],
                    SalesDay: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.SalesByDay();
                        }
                    ],
                    SalesBrand: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.getSalesByBrand();
                        }
                    ],
                    SalesCategory: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.getSalesByCate();
                        }
                    ],
                    SalesProduct: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.getSalesByProduct();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ],
                    Product: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.product();
                        }
                    ]
                }
            })
            .state("Master.AdminDashBoard", {
                url: "^/AdminDashBoard",
                templateUrl: "App/Modules/AdminDashBoard/AdminDashBoard.html",
                controller: "AdminDashBoard",
                data: {pageTitle: 'AdminDashBoard', pageSubTitle: ''},
                resolve: {
                    Record: [
                        'AdminDashboardRepostiory', function (AdminDashboardRepostiory) {
                            return AdminDashboardRepostiory.Get();
                        }
                    ]
                }
            })
            .state("Master.Ar5ssPresent", {
                url: "^/Ar5ssPresent",
                templateUrl: "App/Modules/Ar5ssPresent/Ar5ssPresent.html",
                controller: "Ar5ssPresent",
                data: {pageTitle: 'Ar5ssPresent', pageSubTitle: ''},
                resolve: {
                    ar5sspresnteg: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })
            .state("Master.ColsedOrderBills", {
                url: "^/ColsedOrderBills/:SupplierID",
                templateUrl: "App/Modules/ColsedOrderBills/ColsedOrderBills.html",
                controller: "ColsedOrderBills",
                data: {pageTitle: 'ColsedOrderBills', pageSubTitle: ''},
                resolve: {
                    supplerisorder: [
                        'SalesRepository', '$stateParams', function (salesRepository, $stateParams) {
                            console.log($stateParams.SupplierID);
                            return salesRepository.SuppliersOrder($stateParams.SupplierID);
                        }
                    ]
                }
            })
            .state("Master.CloseOrderEPyment", {
                url: "^/CloseOrderEPyment/:SupplierID",
                templateUrl: "App/Modules/CloseOrderEPyment/CloseOrderEPyment.html",
                controller: "CloseOrderEPyment",
                data: {pageTitle: 'CloseOrderEPyment', pageSubTitle: ''},
                resolve: {
                    supplerisorderepayment: [
                        'SalesRepository', '$stateParams', function (salesRepository, $stateParams) {
                            console.log($stateParams.SupplierID);
                            return salesRepository.SuppliersOrderEPayment($stateParams.SupplierID);
                        }
                    ]
                }
            })
            .state("Master.CashOrder", {
                url: "^/CashOrder",
                templateUrl: "App/Modules/CashOrder/CashOrder.html",
                controller: "CashOrder",
                data: {pageTitle: 'CashOrder', pageSubTitle: ''},
                resolve: {
                    Users: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GETSUP();
                        }
                    ],
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })
            .state("Master.SellerPostion", {
                url: "^/SellerPostion",
                templateUrl: "App/Modules/SellerPostion/SellerPostion.html",
                controller: "SellerPostion",
                data: {pageTitle: 'SellerPostion', pageSubTitle: ''},
                resolve: {
                    SellerPostionLocation: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GetSellerPostion();
                        }
                    ]
                }
            })
            .state("Master.CityManagment", {
                url: "^/CityManagment",
                templateUrl: "App/Modules/City/CityManagment/CityManagment.html",
                controller: "CityManagment",
                data: {pageTitle: 'CityManagment', pageSubTitle: ''},
                resolve: {
                    CityList: [
                        'CityRepository', function (cityRepository) {
                            return cityRepository.Get();
                        }
                    ]
                }
            })
            .state("Master.ColorManagment", {
                url: "^/ColorManagment",
                templateUrl: "App/Modules/Color/ColorManagment/ColorManagment.html",
                controller: "ColorManagment",
                data: {pageTitle: 'ColorManagment', pageSubTitle: ''},
                resolve: {
                    ColorList: [
                        'ColorReposiory', function (colorReposiory) {
                            return colorReposiory.Get();
                        }
                    ]
                }
            })
            .state("Master.EpaymentOrder", {
                url: "^/EpaymentOrder",
                templateUrl: "App/Modules/EpaymentOrder/EpaymentOrder.html",
                controller: "EpaymentOrder",
                data: {pageTitle: 'EpaymentOrder', pageSubTitle: ''},
                resolve: {
                    Users: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GETSUP();
                        }
                    ],
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }

            })
            .state("Master.Budgeting", {
                url: "^/Budgeting",
                templateUrl: "App/Modules/Budgeting/Budgeting.html",
                controller: "Budgeting",
                data: {pageTitle: 'Budgeting', pageSubTitle: ''},
                resolve: {
                    Users: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GETSUP();
                        }
                    ],
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })
            .state("Master.Claims", {
                url: "^/Claims",
                templateUrl: "App/Modules/Claims/Claims.html",
                controller: "Claims",
                data: {pageTitle: 'Claims', pageSubTitle: ''},
                resolve: {
                    Users: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GETSUP();
                        }
                    ],
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })
            .state("Master.Baddebt", {
                url: "^/Baddebt",
                templateUrl: "App/Modules/Baddebt/Baddebt.html",
                controller: "Baddebt",
                data: {pageTitle: 'Baddebt', pageSubTitle: ''},
                resolve: {
                    Users: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GETSUP();
                        }
                    ],
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })
            .state("Master.Actualaccounts", {
                url: "^/Actualaccounts",
                templateUrl: "App/Modules/Actualaccounts/Actualaccounts.html",
                controller: "Actualaccounts",
                data: {pageTitle: 'Actualaccounts', pageSubTitle: ''},
                resolve: {
                    Users: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GETSUP();
                        }
                    ],
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })

            //seller Dashboard
            .state("MasterSeller.SellerStoreManagment", {
                url: "^/SellerStoreManagment",
                templateUrl: "App/Modules/SellerStore/SellerStoreManagment/SellerStoreManagment.html",
                controller: "SellerStoreManagment",
                data: {pageTitle: 'SellerStoreManagment', pageSubTitle: ''},
                resolve: {
                    SellerStoreList: [
                        'SellerStoreRepository', function (sellerStoreRepository) {
                            return sellerStoreRepository.Get();
                        }
                    ],


                }
            })
            .state("MasterSeller.SupplierCity", {
                url: "^/SupplierCity",
                templateUrl: "App/Modules/SupplierCity/SupplierCity.html",
                controller: "SupplierCity",
                data: {pageTitle: 'SupplierCity', pageSubTitle: ''},

            })
            .state("MasterSeller.SellerProductManagment", {
                url: "^/SellerProductManagment",
                templateUrl: "App/Modules/SellerProduct/SellerProductManagment/SellerProductManagment.html",
                controller: "SellerProductManagment",
                data: {pageTitle: 'SellerProductManagment', pageSubTitle: ''},
                resolve: {
                    SellerStoreList: [
                        'SellerStoreRepository', '$rootScope', function (sellerStoreRepository, $rootScope) {
                            console.log($rootScope.CurrentUser.UserID);
                            return sellerStoreRepository.Get($rootScope.CurrentUser.UserID);
                        }
                    ],
                }
            })
            .state("MasterSeller.OrdersForSupplires", {
                url: "^/OrdersForSupplires",
                templateUrl: "App/Modules/OrdersForSupplires/OrddersForSuppliers.html",
                controller: "OrdersForSupplires",
                data: {pageTitle: 'OrdersForSupplires', pageSubTitle: ''}

            })
            .state("MasterSeller.SellerDashboard", {
                url: "^/SellerDashboard",
                templateUrl: "App/Modules/SellerDashBoard/SellerDashBoard.html",
                controller: "SellerDashBoard",
                data: {pageTitle: 'SellerDashBoard', pageSubTitle: ''}

            })

            .state("MasterSeller.NewSupplierOrder", {
                url: "^/NewSupplierOrder",
                templateUrl: "App/Modules/NewSupplierOrder/NewSupplierOrder.html",
                controller: "NewSupplierOrder",
                data: {pageTitle: 'NewSupplierOrder', pageSubTitle: ''}

            })
            .state("MasterSeller.SupplierClosedOrder", {
                url: "^/SupplierClosedOrder",
                templateUrl: "App/Modules/SupplierClosedOrder/SupplierClosedOrder.html",
                controller: "SupplierClosedOrder",
                data: {pageTitle: 'SupplierClosedOrder', pageSubTitle: ''}

            })
            .state("MasterSeller.SuppliersCancelOrder", {
                url: "^/SuppliersCancelOrder",
                templateUrl: "App/Modules/SuppliersCancelOrder/SuppliersCancelOrder.html",
                controller: "SuppliersCancelOrder",
                data: {pageTitle: 'SuppliersCancelOrder', pageSubTitle: ''}

            })
            .state("MasterSeller.LateOrder", {
                url: "^/LateOrder",
                templateUrl: "App/Modules/LateOrder/LateOrder.html",
                controller: "LateOrder",
                data: {pageTitle: 'LateOrder', pageSubTitle: ''}

            })
            .state("MasterSeller.SupplierAddComplain", {
                url: "^/SupplierAddComplain",
                templateUrl: "App/Modules/SupplierAddComplain/SupplierAddComplain.html",
                controller: "SupplierAddComplain",
                data: {pageTitle: 'SupplierAddComplain', pageSubTitle: ''}

            })


            // .state("MasterSeller.ProductManagment", {
            //     url: "^/ProductManagment",
            //     templateUrl: "App/Modules/Product/ProductManagment/ProductManagment.html",
            //     controller: "ProductManagment",
            //     data: {pageTitle: 'ProductManagment', pageSubTitle: ''},
            //     resolve: {
            //         ProductList: [
            //             'ProductRepository', function (productRepository) {
            //                 return productRepository.Get();
            //             }
            //         ],
            //
            //         Size: [
            //             'LoockupsRepository', function (loockupsRepository) {
            //                 return loockupsRepository.GetSize();
            //             }
            //         ],
            //         Category: [
            //             'LoockupsRepository', function (loockupsRepository) {
            //                 return loockupsRepository.GetCategory();
            //             }
            //         ],
            //         Brand: [
            //             'LoockupsRepository', function (loockupsRepository) {
            //                 return loockupsRepository.GetBrand();
            //             }
            //         ]
            //     }
            // })

            .state("MasterSeller.ProductUnderUpdate", {
                url: "^/ProductUnderUpdate",
                templateUrl: "App/Modules/ProductUnderUpdate/ProductUnderUpdateManagment/ProductUnderUpdateManagment.html",
                controller: "ProductUnderUpdateManagment",
                data: {pageTitle: 'ProductUnderUpdateManagment', pageSubTitle: ''},
                resolve: {
                    ProductList: [
                        'ProductRepository', function (productRepository) {
                            return productRepository.Get();
                        }
                    ],

                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ]
                }
            })
            .state("MasterSeller.ProductUnderAdd", {
                url: "^/ProductUnderAdd",
                templateUrl: "App/Modules/ProductUnderAdd/ProductUnderAddManagment/ProductUnderAddManagment.html",
                controller: "ProductUnderAddManagment",
                data: {pageTitle: 'ProductUnderAddManagment', pageSubTitle: ''},
                resolve: {
                    ProductList: [
                        'ProductRepository', function (productRepository) {
                            return productRepository.Get();
                        }
                    ],

                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ]
                }
            })
            .state("MasterSeller.MyProduct", {
                url: "^/MyProduct",
                templateUrl: "App/Modules/MyProduct/MyProductManagment/MyProductManagment.html",
                controller: "MyProductManagment",
                data: {pageTitle: 'MyProductManagment', pageSubTitle: ''},
                resolve: {
                    ProductList: [
                        'ProductRepository', function (productRepository) {
                            return productRepository.Get();
                        }
                    ],

                    Size: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetSize();
                        }
                    ],
                    Category: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetCategory();
                        }
                    ],
                    Brand: [
                        'LoockupsRepository', function (loockupsRepository) {
                            return loockupsRepository.GetBrand();
                        }
                    ]
                }
            })

            .state("MasterSeller.Circulars", {
                url: "^/Circulars",
                templateUrl: "App/Modules/Circulars/Circulars.html",
                controller: "Circulars",
                data: {pageTitle: 'Circulars', pageSubTitle: ''},
                resolve: {
                    AdminCirculList: [
                        'SuppliersRepository', function (suppliersRepository) {
                            return suppliersRepository.GetAadminCruals();
                        }
                    ]
                }
            })

            .state("MasterSeller.SupplierBudgeting", {
                url: "^/SupplierBudgeting",
                templateUrl: "App/Modules/SupplierBudgeting/SupplierBudgeting.html",
                controller: "SupplierBudgeting",
                data: {pageTitle: 'SupplierBudgeting', pageSubTitle: ''},
                resolve: {
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })

            .state("MasterSeller.FinancialSituation", {
                url: "^/FinancialSituation",
                templateUrl: "App/Modules/FinancialSituation/FinancialSituation.html",
                controller: "FinancialSituation",
                data: {pageTitle: 'FinancialSituation', pageSubTitle: ''},
                resolve: {
                    Ar5sspresntage: [
                        'SalesRepository', function (salesRepository) {
                            return salesRepository.ar5sspresnteg();
                        }
                    ]
                }
            })
    }]);
})();