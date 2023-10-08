window.trangChuCtrl = function (
  $scope,
  $http,
  $rootScope,
  TrangChuService,
  TrangChuCategoryService
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

  TrangChuCategoryService.fetchCategories().then(function () {
    $scope.listCategory = TrangChuCategoryService.getCategory();
    console.log($scope.listCategory);
  });

  $scope.pageArticle = function () {
    TrangChuService.fetchFindByArticle($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuService.getFindByArticle();
        console.log($scope.listArticle);
        $scope.totalPages = TrangChuService.getTotalPages();
        $scope.currentPage = TrangChuService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };

  $scope.pageArticle();

  $scope.nextPage = function () {
    $scope.currentPage++;
    if ($scope.currentPage >= $scope.totalPages) {
      $scope.pageModel = $scope.totalPages;
    }
    $scope.findArticleRequest.page = $scope.currentPage;
    TrangChuService.fetchFindByArticle($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuService.getFindByArticle();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };

  $scope.prevPage = function () {
    $scope.currentPage--;
    if ($scope.currentPage <= 0) {
      $scope.currentPage = 0;
    }
    $scope.findArticleRequest.page = $scope.currentPage;
    TrangChuService.fetchFindByArticle($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuService.getFindByArticle();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };

  $scope.inputChangeEvent = function () {
    $scope.findArticleRequest.page = $scope.pageModel - 1;
    TrangChuService.fetchFindByArticle($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuService.getFindByArticle();
      }
    );
  };

  $scope.searchFillter = function (idCategory) {
    $scope.findArticleRequest.categoryId = idCategory;
    $scope.findArticleRequest.page = 0;
    TrangChuService.fetchFindByArticleByCategory(
      $scope.findArticleRequest
    ).then(function (respone) {
      $scope.listArticle = TrangChuService.getFindByArticle();
      $scope.totalPages = TrangChuService.getTotalPages();
      $scope.currentPage = TrangChuService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };
};
