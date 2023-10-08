window.detailArticleCtrl = function (
  $scope,
  $http,
  CensorCategoryService,
  $routeParams,
  CensorArticleService,
  $location
) {
  $scope.selectedCategory = "";

  $scope.refuse = {
    id: $routeParams.id,
    feedback: "",
  };

  CensorCategoryService.fetchCategories().then(function () {
    $scope.listCategory = CensorCategoryService.getCategory();
  });

  CensorArticleService.fetchArticleById($routeParams.id).then(function () {
    $scope.myArticleById = CensorArticleService.getArticleById();
  });

  CensorCategoryService.fetchCategoriesByCensor().then(function () {
    $scope.listCategoryInCbb = CensorCategoryService.getCategoryByCensor();
  });

  $scope.approveArticle = function (event) {
    event.preventDefault();

    var checkErr = true;

    if ($scope.selectedCategory == "") {
      checkErr = false;
      $scope.errCategory = "Vui lòng chọn 1 thể loại!";
    } else {
      checkErr = true;
      $scope.errCategory = "";
    }
    if (
      $scope.feedback == undefined ||
      $scope.feedback == null ||
      $scope.feedback == ""
    ) {
      checkErr = false;
      $scope.errFeedback = "Vui lòng nhập feedback!";
    } else if ($scope.feedback.length > 2147483640) {
      checkErr = false;
      $scope.errFeedback = "Feedback quá dài!";
    } else {
      checkErr = true;
      $scope.errFeedback = "";
    }
    $scope.approve = {
      id: $routeParams.id,
      categoryId: $scope.selectedCategory,
      feedback: $scope.feedback,
    };
    if (checkErr) {
      $http.put(censorArticleAPI + "/approve-article", $scope.approve).then(
        function (response) {
          toastr.success("Successful approval", "Thông báo!", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $location.url("/approve-article");
        },
        function (error) {
          toastr.error("Phê duyệt thất bại!!");
        }
      );
    }
  };

  $scope.refuseArticle = function (event) {
    event.preventDefault();
    checkErr = true;
    if (
      $scope.refuse.feedback == undefined ||
      $scope.refuse.feedback == null ||
      $scope.refuse.feedback == ""
    ) {
      checkErr = false;
      $scope.errFeedback = "Vui lòng nhập feedback!";
    } else if ($scope.refuse.feedback.length > 2147483640) {
      checkErr = false;
      $scope.errFeedback = "Feedback quá dài!";
    } else {
      checkErr = true;
      $scope.errFeedback = "";
    }
    if (checkErr) {
      $http.put(censorArticleAPI + "/refuse-article", $scope.refuse).then(
        function (response) {
          toastr.success("Successful refuse", "Thông báo!", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $location.url("/approve-article");
        },
        function (errors) {
          toastr.error("Phê duyệt thất bại!!");
        }
      );
    }
  };
};
