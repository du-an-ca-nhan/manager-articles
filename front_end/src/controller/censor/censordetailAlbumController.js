window.detailAlbumCtrl = function (
  $scope,
  $routeParams,
  AlbumService,
  $http,
  $location
) {
  $scope.listArticle = [];
  $scope.album = {};

  AlbumService.fetchCheckAlbumOfAuthor( $routeParams.id).then(function(){
    $scope.checkAuthor= AlbumService.getCheckAlbumOfAuthor()
  })
  

  $scope.idArticle = "";
  //get detail album
  AlbumService.fetchAlbum($routeParams.id).then(function () {
    $scope.album = AlbumService.getAlbum();
  });

  //get bài viết trong album
  AlbumService.fetchArticleByAlbum($routeParams.id).then(function () {
    $scope.listArticle = AlbumService.getArticleByAlbum();
    if ($scope.listArticle.length > 0) {
      $scope.idArticle = $scope.listArticle[0].id;
    }
  });

  AlbumService.fetchCheckAlbumOfAuthor($routeParams.id).then(function () {
    $scope.author = AlbumService.getCheckAlbumOfAuthor();
  });

  // begin tym article
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
  // begin article
  $scope.indexArticle = -1;
  $scope.showModalAddArticleToAlbum = function (index) {
    $scope.indexArticle = index;
    $scope.article = $scope.listArticle[index];
  };
  $scope.deleteArticleInAlbum = function (id) {
    $http
      .delete(
        albumAPI +
          "/delete-all-article?articleId=" +
          id +
          "&albumId=" +
          $scope.album.id
      )
      .then(function (response) {
        toastr.error("xóa thành công");
        $scope.listArticle.splice($scope.indexArticle, 1);
        $scope.indexArticle = -1;
      });
  };
  // end article

  //delete article in album

  $scope.deleteArticleInAlbum = function (idArticle, idAlbum) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      $http
        .delete(
          albumAPI +
            "/delete-all-article?articleId=" +
            idArticle +
            "&albumId=" +
            idAlbum
        )
        .then(
          function (response) {
            toastr.success("Xóa thành công", "Thông báo!", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              positionClass: "toast-top-center",
            });
            location.reload();
          },
          function (error) {
            toastr.error("Có lỗi xảy ra", "Thông báo!", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              positionClass: "toast-top-center",
            });
            console.log(error);
          }
        );
    } else {
      toastr.info("Đã hủy xóa", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-center",
      });
    }
  };


  //update album
  $scope.checkUpdate = true;
  $scope.updateAlbum = function () {
    $scope.updateAlbumRequest = {
      title: $scope.album.title,
      status: parseInt($scope.album.status),
    };
    console.log($scope.album.status);
    if ($scope.album.title == undefined) {
      $scope.checkUpdate = false;
      $scope.errTitle = "Title không được để trống";
    } else if ($scope.album.title.length > 225) {
      $scope.checkUpdate = false;
      $scope.errTitle = "Title không được dài quá 225 kí tự";
    } else {
      $scope.checkUpdate = true;
      $scope.errTitle = "";
    }
    if($scope.checkUpdate){
      $http
        .put(albumAPI + "/update/" + $routeParams.id, $scope.updateAlbumRequest)
        .then(function (respone) {
          alert("Sửa thành công");
        });
    }
  };

  //delete album
  $scope.deleteAlbum = function () {
    if (confirm("Bạn có chắc muốn xóa?")) {
      $http.delete(albumAPI + "/delete/" + $routeParams.id).then(
        function (response) {
          toastr.success("Xóa thành công", "Thông báo!", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $location.path("/album");
        },
        function (error) {
          toastr.error("Có lỗi xảy ra", "Thông báo!", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          console.log(error);
        }
      );
    } else {
      toastr.info("Đã hủy xóa", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-center",
      });
    }
  };
};
