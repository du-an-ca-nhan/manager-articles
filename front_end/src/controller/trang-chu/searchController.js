window.searchCtrl = function (
  $scope,
  $http,
  $routeParams,
  ArticleService,
  HashtagService,
  TrangChuCategoryService
) {
  $scope.listArticle = [];

  $scope.findArticleRequest = {
    categoryId: [],
    title: $routeParams.key,
    hashtag: [],
    category: $routeParams.key,
    page: 0,
  };

  TrangChuCategoryService.fetchCategories().then(function () {
    $scope.listCategory = TrangChuCategoryService.getCategory();
    console.log("thử nghiệm");
  });

  HashtagService.fetchTop5HashTag().then(function () {
    $scope.listHashtag = HashtagService.getHashtags();
    console.log($scope.listHashtag);
  });

  ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (
    respone
  ) {
    $scope.listArticle = ArticleService.getArticle();
    $scope.totalPages = ArticleService.getTotalPages();
    $scope.currentPage = ArticleService.getCurrentPage();
    console.log($scope.listArticle);
    $scope.pageModel = $scope.currentPage + 1;
  });

  $scope.searchFillter = function () {
    const checkboxesHashtag = document.querySelectorAll(".checkbox_hashtag");
    $scope.findArticleRequest.hashtag = Array.from(checkboxesHashtag)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) =>checkbox.value)
      console.log($scope.findArticleRequest);
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


  $scope.resetFilter = function () {
    $scope.findArticleRequest.categoryId = "";
    $scope.findArticleRequest.hashtag = "";
    $scope.findArticleRequest.category = $routeParams.key;
    $scope.findArticleRequest.page = 0;
    ArticleService.fetchFindByArticle($scope.findArticleRequest).then(function (
      respone
    ) {
      $scope.listArticle = ArticleService.getFindByArticle();
      $scope.totalPages = ArticleService.getTotalPages();
      $scope.currentPage = ArticleService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };
};
