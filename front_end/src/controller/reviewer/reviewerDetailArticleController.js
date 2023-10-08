window.detailArticleCtrl = function (
  $scope,
  $http,
  $routeParams,
  ReviewerArticleService
) {
  $scope.approve = {
    id: $routeParams.id,
    categoryId: "",
    feedback: "",
  };

  $scope.refuse = {
    id: $routeParams.id,
    feedback: "",
  };

  ReviewerArticleService.fetchArticleById($routeParams.id).then(function () {
    $scope.myArticleById = ReviewerArticleService.getArticleById();
  });

  $scope.rating = "3";
  $scope.content = "";

  $scope.submitRating = function () {
    var formData = {
      articlesId: $routeParams.id,
      content: $scope.content,
      star: $scope.rating,
    };
    var checkContent = true;
    if (
      $scope.content == null ||
      $scope.content == "" ||
      $scope.content.length == 0
    ) {
      console.log($scope.content);
      checkContent = false;
      $scope.errContent = "Vui lòng nhập nội dung đánh giá của bạn vào đây!";
    } else if ($scope.content.length < 6) {
      checkContent = false;

      $scope.errContent = "Nội dung đánh giá không được nhỏ hơn 6 kí tự!";
    } else if ($scope.content.length > 9) {
      checkContent = false;
      $scope.errContent = "Nội dung đánh giá quá dài!";
    } else {
      checkContent = true;
      $scope.errContent = "";
    }
    if (checkContent) {
      $http.post(reviewerArticleAPI + "/evaluate", formData).then(
        function (res) {
          toastr.success("Đánh giá thành công", "Thông báo!", {
            timeOut: 500,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $scope.content = "";
        },
        function (err) {
          toastr.error(err, "Thông báo!", {
            timeOut: 500,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          console.log(err);
        }
      );
    }
  };

  $scope.clearComment = function () {
    $scope.content = "";
  };

  // $scope.approveArticle = function(event){
  //   toastr.warning("Swaiting for progressing", "Thông báo!", {
  //     timeOut: 1000,
  //     closeButton: true,
  //     progressBar: true,
  //     positionClass: "toast-top-center",
  //   });
  //   event.preventDefault()
  //     $http.put(censorArticleAPI+"/approve-article",$scope.approve ).then(function(response){
  //       toastr.success("Successful approval", "Thông báo!", {
  //         timeOut: 3000,
  //         closeButton: true,
  //         progressBar: true,
  //         positionClass: "toast-top-center",
  //       });
  //     })
  // }

  // $scope.refuseArticle = function(event){
  //   event.preventDefault()
  //   $http.put(censorArticleAPI+"/refuse-article",$scope.refuse ).then(function(response){
  //     toastr.success("Successful refuse", "Thông báo!", {
  //       timeOut: 3000,
  //       closeButton: true,
  //       progressBar: true,
  //       positionClass: "toast-top-center",
  //     });
  //   })
  // }
};
