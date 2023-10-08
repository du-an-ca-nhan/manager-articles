window.searchCategorygCtrl = function ($scope, $routeParams, CategoryService) {
  $scope.listArticle = [];

  $scope.nameCategory = $routeParams.category;

  $scope.load = function () {
    $scope.findArticleRequest = {
      categoryName: $scope.nameCategory,
      page: 0,
    };
    CategoryService.fetchSearchCategories($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = CategoryService.getSearchCategory();
        $scope.totalPages = CategoryService.getTotalPages();
        $scope.currentPage = CategoryService.getCurrentPage();
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
    CategoryService.fetchSearchCategories($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = CategoryService.getFindByArticle();
        $scope.totalPages = CategoryService.getTotalPages();
        $scope.currentPage = CategoryService.getCurrentPage();
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
    CategoryService.fetchSearchCategories($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = CategoryService.getFindByArticle();
        $scope.totalPages = CategoryService.getTotalPages();
        $scope.currentPage = CategoryService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };
};
