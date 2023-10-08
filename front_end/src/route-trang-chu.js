appTrangChu.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/article", {
      templateUrl: "pages/trang-chu/home.html",
      controller: trangChuCtrl,
    })
    .when("/search", {
      templateUrl: "pages/trang-chu/search-result.html",
      controller: searchCtrl,
    })
    .when("/search-hashtag", {
      templateUrl: "pages/trang-chu/search-hashtag-result.html",
      controller: searchHashtagCtrl,
    })
    .when("/search-category", {
      templateUrl: "pages/trang-chu/search-category-result.html",
      controller: searchCategorygCtrl,
    })
    .when("/article/:id", {
      templateUrl: "./pages/trang-chu/trang-chu-detail-article.html",
      controller: TrangchuDetailArticleCtrl,
    })
    .when("/login/", {
      templateUrl: "./pages/trang-chu/login.html",
      // controller: TrangchuDetailArticleCtrl,
    })
    .otherwise({
      redirectTo: "/article",
    });
});
appTrangChu.controller("searchHashtagCtrl", function ($scope, HeaderService) {
  HeaderService.setHeaderColor("header-color");
});
