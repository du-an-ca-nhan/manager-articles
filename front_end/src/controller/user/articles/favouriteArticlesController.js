window.favouriteArticleCtrl = function ($scope, $http, TymService) {
  $scope.listArticleFavorite = {};
  $scope.isObjectEmpty = function (obj) {
    return Object.keys(obj).length === 0;
  };
  $scope.selection = [];

  TymService.fetchArticleFavorite().then(function () {
    $scope.listArticleFavorite = TymService.getArticleFavorite();
  });
  document
    .getElementById("defaultCheck1")
    .addEventListener("click", function () {
      var checkboxes = document.querySelectorAll(
        ".form-check-input:not(#defaultCheck1)"
      );
      if (this.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = true;
        }
      } else {
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
        }
      }
      $scope.checkboxChanged();
    });
  $scope.checkboxChanged = function () {
    var count = 0;
    var checkboxes = document.querySelectorAll("table input[type=checkbox]");
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        count++;
        console.log(count);
      }
    }
    if (count >= 2) {
      document.getElementById("deleteBtn").style.display = "block";
    } else {
      document.getElementById("deleteBtn").style.display = "none";
    }
  };
  $scope.deleteSelected = function () {
    const checkboxes = document.querySelectorAll(".form-check-input");
    const checkedValues = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    $http.delete(tymAPI + "/" + checkedValues).then(function (response) {
      TymService.fetchArticleFavorite().then(function () {
        $scope.listArticleFavorite = TymService.getArticleFavorite();
      });
    });
  };
  $scope.unfavoriteArticle = function (key, index, articleId) {
    $http
      .delete(tymAPI + "/unfavorite-article/" + articleId)
      .then(function (response) {
        $scope.listArticleFavorite[key].splice(index, 1);
        var isEmpty = $scope.listArticleFavorite[key].filter(function (val) {
          return val !== null || val !== "";
        }).length;
        if (isEmpty === 0) {
          delete $scope.listArticleFavorite[key];
        }
      });
  };
};
