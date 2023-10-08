window.searchCategorygCtrl = function ($scope, $routeParams, TrangChuCategoryService) {
  $scope.listArticle = [];

  $scope.nameCategory = $routeParams.category;

  $scope.load = function () {
    $scope.findArticleRequest = {
      categoryName: $scope.nameCategory,
      page: 0,
    };
    TrangChuCategoryService.fetchSearchCategories($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuCategoryService.getSearchCategory();
        $scope.totalPages = TrangChuCategoryService.getTotalPages();
        $scope.currentPage = TrangChuCategoryService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };
  $scope.load();
  $scope.nextPage = function () {
    $scope.currentPage++;
    if ($scope.currentPage >= $scope.totalPages) {
      $scope.pageModel = $scope.totalPages;
    }
    $scope.findArticleRequest = {
      categoryName: $scope.nameCategory,
      page: $scope.currentPage,
    };
    TrangChuCategoryService.fetchSearchCategories($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuCategoryService.getFindByArticle();
        $scope.totalPages = TrangChuCategoryService.getTotalPages();
        $scope.currentPage = TrangChuCategoryService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };

  $scope.prevPage = function () {
    $scope.currentPage--;
    if ($scope.currentPage <= 0) {
      $scope.currentPage = 0;
    }
    $scope.findArticleRequest = {
      categoryName: $scope.nameCategory,
      page: $scope.currentPage,
    };
    TrangChuCategoryService.fetchSearchCategories($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = TrangChuCategoryService.getFindByArticle();
        $scope.totalPages = TrangChuCategoryService.getTotalPages();
        $scope.currentPage = TrangChuCategoryService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };
};
