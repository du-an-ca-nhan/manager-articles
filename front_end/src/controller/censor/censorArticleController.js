window.articleCtrl = function (
  $scope,
  $http,
  $rootScope,
  CensorArticleService
) {
  $scope.listArticle = [];
  $scope.search = {
    sortOrder: "newest",
    startDate: null,
    endDate: null,
    page: 0,
  };
  $scope.filter = function () {
    CensorArticleService.fetchCensorArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = CensorArticleService.getArticles();
      $scope.totalPages = CensorArticleService.getTotalPages();
      $scope.currentPage = CensorArticleService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };
  CensorArticleService.fetchCensorArticles($scope.search).then(function (
    respone
  ) {
    $scope.listArticle = CensorArticleService.getArticles();
    $scope.totalPages = CensorArticleService.getTotalPages();
    $scope.currentPage = CensorArticleService.getCurrentPage();
    $scope.pageModel = $scope.currentPage + 1;
  });

  $scope.pageArticle = function () {
    CensorArticleService.fetchCensorArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = CensorArticleService.getArticles();
      $scope.totalPages = CensorArticleService.getTotalPages();
      $scope.currentPage = CensorArticleService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.pageArticle();

  $scope.nextPage = function () {
    $scope.currentPage++;
    if ($scope.currentPage >= $scope.totalPages) {
      $scope.pageModel = $scope.totalPages;
    }
    $scope.search.page = $scope.currentPage;
    CensorArticleService.fetchCensorArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = CensorArticleService.getArticles();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.prevPage = function () {
    $scope.currentPage--;
    if ($scope.currentPage <= 0) {
      $scope.currentPage = 0;
    }
    $scope.search.page = $scope.currentPage;
    CensorArticleService.fetchCensorArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = CensorArticleService.getArticles();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.inputChangeEvent = function () {
    $scope.search.page = $scope.pageModel - 1;
    CensorArticleService.fetchCensorArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = CensorArticleService.getArticles();
    });
  };
};
