window.TrangchuDetailArticleCtrl = function (
  $scope,
  $http,
  $routeParams,
  TrangChuService
) {
  TrangChuService.fetchArticlesById($routeParams.id).then(function () {
    $scope.articleById = TrangChuService.getArticleById();
    console.log($scope.articleById);
  });
};
