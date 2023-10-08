window.detailUserCtrl = function (
    $scope,
    $http,
    UserService,
    $routeParams,
    AlbumService,
    ArticleService
  ) {
    $scope.authen = false;
    $scope.createNewAlbum = { title: "", status: true };
    $scope.listArticle = [];
    $scope.listAlbum = [];
    $scope.listAlbumDefault = [];
    $scope.search = "";
    $scope.UserCreateArticle = {};
  
    UserService.fetchProfileAuthor($routeParams.id).then(function () {
      $scope.user = UserService.getProfileAuthor();
    });
    AlbumService.fetchAlbumOfAuthor($routeParams.id).then(function (respone) {
      $scope.albums = AlbumService.getAlbumOfAuthor();
    });
  
    // Phân trang user
    ArticleService.fetchArticlesByAuthorId($routeParams.id, 0).then(function (
      respone
    ) {
      $scope.listArticle = ArticleService.getArticlesOfUser();
        console.log($scope.listArticle);
  
      $scope.currentPage = ArticleService.getCurrentPageArticleOfUser();
      $scope.totalPages = ArticleService.getTotalPagesArticleOfUser();
      $scope.pageModel = $scope.currentPage + 1;
      console.log($scope.currentPage);
    });
  
    $scope.nextPage = function () {
      $scope.currentPage++;
      if ($scope.currentPage >= $scope.totalPages) {
        $scope.pageModel = $scope.totalPages;
      }
      console.log($scope.currentPage);
      ArticleService.fetchArticlesByAuthorId(
        $routeParams.id,
        $scope.currentPage
      ).then(function (respone) {
        $scope.listArticle = ArticleService.getArticlesOfUser();
        $scope.pageModel = $scope.currentPage + 1;
      });
    };
  
    $scope.prevPage = function () {
      $scope.currentPage--;
      if ($scope.currentPage <= 0) {
        $scope.currentPage = 0;
      }
      console.log($scope.currentPage);
      ArticleService.fetchArticlesByAuthorId(
        $routeParams.id,
        $scope.currentPage
      ).then(function (respone) {
        $scope.listArticle = ArticleService.getArticlesOfUser();
        $scope.pageModel = $scope.currentPage + 1;
      });
    };
  
    // begin quick  add album
  
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
  
    $scope.createAlbumQuick = function (event) {
      event.preventDefault();
      if ($scope.createNewAlbum.title != "") {
        $http
          .post(albumAPI + "/create", $scope.createNewAlbum)
          .then(function (respone) {
            $scope.album = respone.data.data;
            $scope.album.countArticle = 0;
            $scope.listAlbum.push($scope.album);
            $scope.createNewAlbum = { title: "", status: true };
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
      if ($scope.search.trim() == "") {
        $scope.listAlbum = $scope.listAlbumDefault;
      } else {
        var albums = [];
        $scope.listAlbum.map((item) => {
          if (item.title !== null && item.title.includes($scope.search)) {
            albums.push(item);
          }
        });
        $scope.listAlbum = albums;
      }
    };
    $scope.closeFormAddAlbum = function () {
      document.querySelectorAll("input:checked").forEach((item) => {
        item.checked = false;
      });
    };
    //  end quick  add album
  
    // begin tym article
    $scope.favoriteArticle = function (id, index) {
      $scope.createTymRequest = {
        articlesId: id,
      };
      console.log(id);
      $http
        .post(tymAPI + "/favorite-article", $scope.createTymRequest)
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
  