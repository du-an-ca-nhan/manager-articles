window.searchHashtagCtrl = function ($scope, $routeParams, HashtagService) {
  $scope.listArticle = [];

  $scope.nameHashtag = $routeParams.hashtag.trim();

  $scope.load = function () {
    $scope.findArticleRequest = {
      hashtagName: $scope.nameHashtag,
      page: 0,
    };
    HashtagService.fetchSearchHashtags($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = HashtagService.getSearchHashtag();
        $scope.totalPages = HashtagService.getTotalPages();
        $scope.currentPage = HashtagService.getCurrentPage();
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
      hashtagName: $scope.nameHashtag,
      page: $scope.currentPage,
    };
    HashtagService.fetchSearchHashtags($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = HashtagService.getSearchHashtag();
        $scope.totalPages = HashtagService.getTotalPages();
        $scope.currentPage = HashtagService.getCurrentPage();
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
      hashtagName: $scope.nameHashtag,
      page: $scope.currentPage,
    };
    HashtagService.fetchSearchHashtags($scope.findArticleRequest).then(
      function (respone) {
        $scope.listArticle = HashtagService.getSearchHashtag();
        $scope.totalPages = HashtagService.getTotalPages();
        $scope.currentPage = HashtagService.getCurrentPage();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };
};
