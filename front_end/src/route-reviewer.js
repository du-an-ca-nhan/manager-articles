appReviewer.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/approve-article", {
      templateUrl: "./pages/reviewer/reviewer-article.html",
      controller: articleCtrl,
    })
    .when("/article/:id", {
      templateUrl: "./pages/reviewer/reviewer-detail-article.html",
      controller: detailArticleCtrl,
    })
    .when("/users/:id", {
      templateUrl: "./pages/reviewer/profilies/profile.html",
      controller: detailUserCtrl,
    })
    .when("/album/:id", {
      templateUrl: "./pages/reviewer/albums/detail-album.html",
      controller: detailAlbumCtrl,
    })
    .otherwise({
      redirectTo: "/approve-article",
    });
});
appReviewer.run(function ($rootScope) {
  $rootScope.$on("$routeChangeStart", function () {
    $rootScope.loading = true;
  });
  $rootScope.$on("$routeChangeSuccess", function () {
    $rootScope.loading = false;
  });
  $rootScope.$on("$routeChangeError", function () {
    $rootScope.loading = false;
    alert("Lỗi, Không tải được template");
  });
});
