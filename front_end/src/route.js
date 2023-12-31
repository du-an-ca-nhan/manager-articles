app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/search-result", {
      templateUrl: "./pages/user/searches/search-result.html",
      controller: searchCtrl,
    })
    .when("/search-hashtag", {
      templateUrl: "./pages/user/searches/search-hashtag-result.html",
      controller: searchHashtagCtrl,
    })
    .when("/search-category", {
      templateUrl: "./pages/user/searches/search-category-result.html",
      controller: searchCategorygCtrl,
    })
    .when("/trang-chu", {
      templateUrl: "./pages/trang-chu.html",
      controller: homeCtrl,
    })
    .when("/trang-chu/:id", {
      templateUrl: "./pages/user/articles/detail-article.html",
      controller: detailArticleCtrl,
    })
    .when("/pages", {
      templateUrl: "./pages/pages.html",
    })
    .when("/myblog", {
      templateUrl: "./pages/my-blog.html",
    })
    .when("/blog", {
      templateUrl: "./pages/blog.html",
    })
    .when("/my-article", {
      templateUrl: "./pages/user/my-articles/my-article.html",
      controller: myArticleCtrl,
    })
    .when("/articles", {
      templateUrl: "./pages/user/articles/articles.html",
      controller: articleCtrl,
    })
    .when("/favourite-articles", {
      templateUrl: "./pages/user/favourite-articles/favourite-articles.html",
      controller: favouriteArticleCtrl,
    })
    .when("/profile", {
      templateUrl: "./pages/user/profilies/profile.html",
      controller: profileController,
    })
    .when("/contact", {
      templateUrl: "./pages/contact.html",
    })
    // .when("/login", {
    //   templateUrl: "./pages/login.html",
    // })
    // .when("/signup", {
    //   templateUrl: "./pages/signup.html",
    // })
    .when("/album", {
      templateUrl: "./pages/user/albums/album.html",
      controller: albumCtrl,
    })
    .when("/album/:id", {
      templateUrl: "./pages/user/albums/detail-album.html",
      controller: detailAlbumCtrl,
    })
    .when("/article-trash", {
      templateUrl: "./pages/user/trash-articles/article-trash.html",
      controller: articleTrashCtrl,
    })
    .when("/article/:id", {
      templateUrl: "./pages/user/articles/detail-article.html",
      controller: detailArticleCtrl,
    })
    .when("/my-article/:id", {
      templateUrl: "./pages/user/my-articles/detail-my-article.html",
      controller: detailArticleCtrl,
    })
    .when("/my-article/update-article/:id", {
      templateUrl: "./pages/user/articles/create-article.html",
      controller: createArticleCtrl,
    })
    .when("/my-article/delete-article/:id", {
      templateUrl: "./pages/user/my-articles/my-article.html",
      controller: createArticleCtrl,
    })
    .when("/create-article", {
      templateUrl: "./pages/user/articles/create-article.html",
      controller: createArticleCtrl,
    })
    .when("/users/:id", {
      templateUrl: "./pages/user/profilies/profile.html",
      controller: detailUserCtrl,
    })
    .when("/users", {
      templateUrl: "./pages/user/profilies/users.html",
    })
    .when("/history", {
      templateUrl: "./pages/user/histories/history.html",
      controller: historyCtrl,
    })
    .when("/chart", {
      templateUrl: "./pages/user/chart/charts.html",
      controller: chartCtrl,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
app.run(function ($rootScope) {
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
