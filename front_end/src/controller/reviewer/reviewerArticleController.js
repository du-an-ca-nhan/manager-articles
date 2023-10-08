window.articleCtrl = function (
  $scope,
  $http,
  $rootScope,
  ReviewerArticleService
) {
  $scope.listArticle = [];
  $scope.search = {
    sortOrder: "newest",
    startDate: null,
    endDate: null,
    page: 0,
  };
  $scope.filter = function () {
    ReviewerArticleService.fetchArticles($scope.search).then(function (
      respone
    ) {
      console.log($scope.search);
      $scope.listArticle = ReviewerArticleService.getArticles();
      $scope.totalPages = ReviewerArticleService.getTotalPages();
      $scope.currentPage = ReviewerArticleService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };
  ReviewerArticleService.fetchArticles($scope.search).then(function (respone) {
    $scope.listArticle = ReviewerArticleService.getArticles();
    $scope.totalPages = ReviewerArticleService.getTotalPages();
    $scope.currentPage = ReviewerArticleService.getCurrentPage();
    $scope.pageModel = $scope.currentPage + 1;
  });

  $scope.pageArticle = function () {
    ReviewerArticleService.fetchArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = ReviewerArticleService.getArticles();
      $scope.totalPages = ReviewerArticleService.getTotalPages();
      $scope.currentPage = ReviewerArticleService.getCurrentPage();
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
    ReviewerArticleService.fetchArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = ReviewerArticleService.getArticles();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.prevPage = function () {
    $scope.currentPage--;
    if ($scope.currentPage <= 0) {
      $scope.currentPage = 0;
    }
    $scope.search.page = $scope.currentPage;
    ReviewerArticleService.fetchArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = ReviewerArticleService.getArticles();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };

  $scope.inputChangeEvent = function () {
    $scope.search.page = $scope.pageModel - 1;
    ReviewerArticleService.fetchArticles($scope.search).then(function (
      respone
    ) {
      $scope.listArticle = ReviewerArticleService.getArticles();
    });
  };
};
