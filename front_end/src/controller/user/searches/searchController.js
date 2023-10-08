window.searchCtrl = function ($scope, $http, CategoryService, $routeParams,ArticleService, HashtagService, AlbumService ) {
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
  $scope.findArticleRequest = {
    categoryId: [],
    title: $routeParams.key,
    hashtag: [],
    category: $routeParams.key,
    page: 0,
  };
  CategoryService.fetchCategories().then(function () {
    $scope.listCategory = CategoryService.getCategory();
    console.log($scope.listCategory);
  });

  HashtagService.fetchTop5HashTag().then(function () {
    $scope.listHashtag = HashtagService.getHashtags();
  });

  ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (respone) {
    $scope.listArticle = ArticleService.getFindByArticle();
    $scope.totalPages = ArticleService.getTotalPages();
    $scope.currentPage = ArticleService.getCurrentPage();
    // console.log($scope.listArticle);
    $scope.pageModel = $scope.currentPage + 1;
  });



  $scope.resetFilter = function(){
    $scope.findArticleRequest.categoryId =""
    $scope.findArticleRequest.hashtag = ""
    $scope.findArticleRequest.category = $routeParams.key
    $scope.findArticleRequest.page = 0;
    ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (respone) {
      $scope.listArticle = ArticleService.getFindByArticle();
        $scope.totalPages = ArticleService.getTotalPages();
        $scope.currentPage = ArticleService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  }

  $scope.searchFillter = function () {
    const checkboxesHashtag = document.querySelectorAll(".checkbox_hashtag");
    $scope.findArticleRequest.hashtag = Array.from(checkboxesHashtag)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) =>checkbox.value)
      const checkboxesCategory = document.querySelectorAll(".checkbox__category");
    $scope.findArticleRequest.categoryId = Array.from(checkboxesCategory)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value)
      console.log($scope.findArticleRequest);
    $scope.findArticleRequest.page = 0;
    ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (
      respone
    ) {
      $scope.listArticle = ArticleService.getArticle();
      $scope.totalPages = ArticleService.getTotalPages();
      $scope.currentPage = ArticleService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
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
        .post(albumAPI+"/add-article", $scope.UserCreateArticle)
        .then(function (response) {
          toastr.success("thêm thành công");
        });
    } else {
      $http
        .delete(
          albumAPI+"/delete-all-article?articleId=" +
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
        .post(albumAPI+"/create", $scope.createAlbumRequest)
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
  $scope.favoriteArticle = function (id, index) {
    $scope.createTymRequest = {
      articlesId: id,
    };
    $http
      .post(tymAPI+"/favorite-article", $scope.createTymRequest)
      .then(function (respone) {
        $scope.article = $scope.listArticle[index];
        $scope.article.tym += 1;
        $scope.article.favorite = 1;
        $scope.listArticle.splice(index, 1, $scope.article);
      });
  };
  $scope.unfavoriteArticle = function (id, index) {
    if ($scope.listArticle[index].tym >= 0) {
      $http
        .delete(tymAPI+"/unfavorite-article/" + id)
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
