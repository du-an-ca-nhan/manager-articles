window.articleTrashCtrl = function ($scope, $http, ArticleTrashService) {
  $scope.listArticleTrash = {};
  $scope.isObjectEmpty = function (obj) {
    return Object.keys(obj).length === 0;
  };
  ArticleTrashService.fetchTrashes().then(function () {
    $scope.listArticleTrash = ArticleTrashService.getTrash();
  });

  $scope.deleteArticle = function (key, index, id) {
    $http.delete(articleTrashAPI + "/" + id).then(function (respone) {
      $scope.listArticleTrash[key].splice(index, 1);
      var isEmpty = $scope.listArticleTrash[key].filter(function (val) {
        return val !== null || val !== "";
      }).length;
      if (isEmpty === 0) {
        delete $scope.listArticleTrash[key];
      }
    });
  };

  $scope.restoreArticle = function (key, index, id) {
    $http.put(articleTrashAPI + "/restore/" + id).then(function (respone) {
      $scope.listArticleTrash[key].splice(index, 1);
      var isEmpty = $scope.listArticleTrash[key].filter(function (val) {
        return val !== null || val !== "";
      }).length;
      if (isEmpty === 0) {
        delete $scope.listArticleTrash[key];
      }
    });
  };

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
    $http
      .delete(articleTrashAPI + "/delete-articles/" + checkedValues)
      .then(function (response) {
        ArticleTrashService.fetchTrashes().then(function () {
          $scope.listArticleTrash = ArticleTrashService.getTrash();
        });
      });
  };
};
