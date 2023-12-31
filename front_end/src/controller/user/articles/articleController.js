window.articleCtrl = function (
  $scope,
  $http,
  ArticleService,
  localStorageService,
  CategoryService,
  AlbumService,
  $rootScope
) {
  $scope.findArticleRequest = {
    categoryId: "",
    title: "",
    hashtag: "",
    category: "",
    page: 0,
  };

  $scope.listArticle = [];
  $scope.listAlbum = [];
  $scope.listAlbumDefault = [];
  $scope.nameAlbum = "";
  $scope.UserCreateArticle = {
    articlesId: "",
    albumId: "",
  };

  $scope.createAlbumRequest = {
    title: "",
    status: true,
  };

  CategoryService.fetchCategories().then(function () {
    $scope.listCategory = CategoryService.getCategory();
  });

  $scope.pageArticle = function () {
    ArticleService.fetchArticles(0).then(function (respone) {
      $scope.listArticle = ArticleService.getArticle();
      $scope.totalPages = ArticleService.getTotalPages();
      $scope.currentPage = ArticleService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.pageArticle();

  $scope.nextPage = function () {
    $scope.currentPage++;
    if ($scope.currentPage >= $scope.totalPages) {
      $scope.pageModel = $scope.totalPages;
    }
    $scope.findArticleRequest.page = $scope.currentPage;
    ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (
      respone
    ) {
      $scope.listArticle = ArticleService.getFindByArticle();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.prevPage = function () {
    $scope.currentPage--;
    if ($scope.currentPage <= 0) {
      $scope.currentPage = 0;
    }
    $scope.findArticleRequest.page = $scope.currentPage;
    ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (
      respone
    ) {
      $scope.listArticle = ArticleService.getFindByArticle();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.inputChangeEvent = function () {
    $scope.findArticleRequest.page = $scope.pageModel - 1;
    ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (
      respone
    ) {
      $scope.listArticle = ArticleService.getFindByArticle();
    });
  };

  $scope.searchFillter = function (idCategory) {
    $scope.findArticleRequest.categoryId = idCategory;
    $scope.findArticleRequest.page = 0;
    ArticleService.fetchFindByArticleByCategory($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = ArticleService.getFindByArticle();
        $scope.totalPages = ArticleService.getTotalPages();
        $scope.currentPage = ArticleService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };
  // begin album

  $scope.showModalAddArticleToAlbum = function (id) {
    $scope.UserCreateArticle.articlesId = id;
    AlbumService.fetchSimpleAlbums(id).then(function () {
      $scope.listAlbum = AlbumService.getSimpleAlbums();
      $scope.listAlbumDefault = AlbumService.getSimpleAlbums();
    });
  };

  $scope.addArticleToAlbum = function (id) {
    $scope.UserCreateArticle.albumId = id;
    if (document.getElementById(id).checked) {
      $http
        .post(albumAPI + "/add-article", $scope.UserCreateArticle)
        .then(function (response) {
          toastr.success("thêm thành công");
        });
    } else {
      $http
        .delete(
          albumAPI +
            "/delete-all-article?articleId=" +
            $scope.UserCreateArticle.articlesId +
            "&albumId=" +
            id
        )
        .then(function (response) {
          toastr.error("xóa thành công");
        });
    }
  };

  $scope.createAlbum = function (event) {
    event.preventDefault();
    if ($scope.createAlbumRequest.title != "") {
      $http
        .post(albumAPI + "/create", $scope.createAlbumRequest)
        .then(function (respone) {
          $scope.album = respone.data.data;
          $scope.album.countArticle = 0;
          $scope.listAlbum.push($scope.album);
          $scope.createAlbumRequest = { title: "" };
        });
    }
    document.getElementById("formThemMoi").style.display = "none";
    document.getElementById("createAlbum").style.display = "block";
  };

  $scope.showCreateAlbum = function () {
    document.getElementById("formThemMoi").style.display = "block";
    document.getElementById("createAlbum").style.display = "none";
  };

  $scope.searchAlbum = function () {
    $scope.listAlbum = $scope.listAlbumDefault;
    if ($scope.nameAlbum.trim() == "") {
      $scope.listAlbum = $scope.listAlbumDefault;
    } else {
      var albums = [];
      $scope.listAlbum.map((item) => {
        if (item.title !== null && item.title.includes($scope.nameAlbum)) {
          albums.push(item);
        }
      });
      $scope.listAlbum = albums;
    }
  };

  $scope.closeFormAddAlbum = function () {
    document.getElementById("formThemMoi").style.display = "none";
    document.getElementById("createAlbum").style.display = "block";
    document.querySelectorAll("input:checked").forEach((item) => {
      item.checked = false;
    });
  };
  //  end album

  // begin tym article

  const socket = new SockJS(
    "http://localhost:6868/portal-articles-websocket-endpoint"
  );
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe(
      "/portal-articles/create-notification-tym-user/" + idUser,
      function (message) {
        $rootScope.countNotifications = JSON.parse(message.body).data;
        $scope.$apply();
      }
    );
  });
  $scope.favoriteArticle = function (id, index) {
    $scope.createTymRequest = {
      articlesId: id,
    };
    $http
      .post(tymAPI + "/favorite-article", $scope.createTymRequest)
      .then(function (respone) {
        $scope.article = $scope.listArticle[index];
        $scope.article.tym += 1;
        $scope.article.favorite = 1;
        $scope.listArticle.splice(index, 1, $scope.article);
        stompClient.send("/action/create-notification-tym-user/" + idUser, {});
      });
  };

  $scope.unfavoriteArticle = function (id, index) {
    if ($scope.listArticle[index].tym >= 0) {
      $http
        .delete(tymAPI + "/unfavorite-article/" + id)
        .then(function (respone) {
          $scope.article = $scope.listArticle[index];
          $scope.article.tym -= 1;
          $scope.article.favorite = 0;
          $scope.listArticle.splice(index, 1, $scope.article);
        });
    }
  };
  // end tym article
};
