window.createArticleCtrl = function (
  $scope,
  $http,
  CategoryService,
  $routeParams,
  MyArticleService,
  $sce,
  $location 
) {
  $scope.listTag = [];

  $scope.select2Options = {
    multiple: true,
    simple_tags: true,
    tags: $scope.listTag,
    tokenSeparators: ["/", ",", ";", " "],
  };
  $scope.isMenuOpen = false;
  $scope.toggleMenu = function () {
    $scope.isMenuOpen = !$scope.isMenuOpen;
  };

  $http.get(hashtagAPI).then(function (response) {
    response.data.data.map((item) => {
      $scope.listTag.push(item.title);
    });
    $scope.select2Options = {
      multiple: true,
      simple_tags: true,
      tags: $scope.listTag,
      tokenSeparators: ["/", ",", ";", " "],
    };
  });
  $scope.list_of_string = [];

  CategoryService.fetchCategories().then(function () {
    $scope.listCategory = CategoryService.getCategory();
  });
  // Thêm bài viết rồi gửi yêu cầu phê duyệt
  $scope.saveHTML = function (event) {
    event.preventDefault();

    var content = $("#summernote").summernote("code");
    var strippedText = content
      .replace(/<\/?[^>]+(>|$)/g, " ")
      .replace(/(&nbsp;)+/g, " ");
    var words = strippedText.split(" ");
    var first30Words = words.slice(0, 60);
    var first30WordsString = first30Words.join(" ");
    var formData = {
      title: $scope.title,
      content: content,
      descriptive: first30WordsString,
      hashtag: $scope.list_of_string,
    };
    var check = true;
    if (!$scope.title || $scope.title.trim().length === 0) {
      check = false;
      $scope.errTitle = "Title không được bỏ trống!";
    } else if ($scope.title.trim().length > 225) {
      check = false;
      $scope.errTitle = "Title không được vượt quá 225 kí tự!";
    } else {
      check = true;
      $scope.errTitle = "";
    }
    console.log($scope.list_of_string.length);
    var check1 = true;
    if (!$scope.list_of_string || $scope.list_of_string.length === 0) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được bỏ trống!";
    } else if ($scope.list_of_string.length > 5) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được quá 5 thẻ!";
    } else {
      check1 = true;
      $scope.errHashTag = "";
    }
    if (
      content.trim().replace(/<p>|<\/p>|<br>|&nbsp;|\s+/gi, "").length === 0
    ) {
      check = false;
      $scope.errContent = "Content không được bỏ trống!";
    } else {
      check = true;
      $scope.errContent = "";
    }
    if (check && check1) {
      $http.post(myArticleAPI + "/create-article", formData).then(
        function (response) {
          toastr.success("Đã gửi yêu cầu phê duyệt thành công", "Thông báo!", {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $location.url("/my-article");
        },
        function (error) {
          toastr.error("Gửi yêu cầu phê duyệt thất bại", "Thông báo!", {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
        }
      );
    }
  };
  // Tạo bản nháp cho bài viết hiện tại
  $scope.saveDraftHTML = function (event) {
    var content = $("#summernote").summernote("code");
    var strippedText = content.replace(/<\/?[^>]+(>|$)/g, " ");
    var words = strippedText.split(" ");
    var first30Words = words.slice(0, 60);
    var first30WordsString = first30Words.join(" ");
    var formData = {
      title: $scope.title,
      content: content,
      descriptive: first30WordsString,
      hashtag: $scope.list_of_string,
    };
    var check = true;
    if (!$scope.title || $scope.title.trim().length === 0) {
      check = false;
      $scope.errTitle = "Title không được bỏ trống!";
    } else if ($scope.title.trim().length > 225) {
      check = false;
      $scope.errTitle = "Title không được vượt quá 225 kí tự!";
    } else {
      check = true;
      $scope.errTitle = "";
    }
    console.log($scope.list_of_string.length);
    var check1 = true;
    if (!$scope.list_of_string || $scope.list_of_string.length === 0) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được bỏ trống!";
    } else if ($scope.list_of_string.length > 5) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được quá 5 thẻ!";
    } else {
      check1 = true;
      $scope.errHashTag = "";
    }
    if (
      content.trim().replace(/<p>|<\/p>|<br>|&nbsp;|\s+/gi, "").length === 0
    ) {
      check = false;
      $scope.errContent = "Content không được bỏ trống!";
    } else {
      check = true;
      $scope.errContent = "";
    }
    if (check && check1) {
      $http.post(myArticleAPI + "/create-draft-article", formData).then(
        function (response) {
          toastr.success("Lưu bản nháp thành công", "Thông báo!", {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $location.url("/my-article");
        },
        function (error) {
          toastr.error("Lưu bản nháp thất bại", "Thông báo!", {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          console.log(error);
          console.log("Thất bại rồi xem lại code đi");
        }
      );
    }
  };
  // vào trang update thì nút update hiển thị, nút add ẩn
  if (!window.location.href.includes("create-article")) {
    $scope.showButton = true;
    var id = $routeParams.id;
    $scope.getHtml = function () {
      var filePath =
        "../../../articles-project/src/main/resources/templates/articles/" +
        id +
        "/toi-thanh-cong-roi.html";
      $http.get(filePath).then(function (response) {
        $("#summernote")
          .summernote({
            focus: true,
          })
          .summernote("code", response.data);
      });
    };
    // hiển thị detail bài viết khi vào trang update ấn detail
    MyArticleService.fetchUpdateMyArticleById(id).then(function () {
      $scope.myUpdateArticleById = MyArticleService.getMyUpdateArticleById();
      if ($scope.myUpdateArticleById.hashtag == null) {
        $scope.title = $scope.myUpdateArticleById.title;
        $scope.list_of_string = $scope.myUpdateArticleById.hashtags;
        $scope.status = $scope.myUpdateArticleById.status;
      } else {
        $scope.title = $scope.myUpdateArticleById.title;
        $scope.list_of_string = $scope.myUpdateArticleById.hashtags.split(",");
        $scope.status = $scope.myUpdateArticleById.status;
      }
      console.log($scope.myUpdateArticleById);
    });
  }
  // sửa bài viết rồi lưu với trạng thái hiện tại
  $scope.updateMyArticle = function (event) {
    event.preventDefault();
    var content = $("#summernote").summernote("code");
    var strippedText = content.replace(/<\/?[^>]+(>|$)/g, " ");
    var words = strippedText.split(" ");
    var first30Words = words.slice(0, 70);
    var first30WordsString = first30Words.join(" ");
    if (Array.isArray($scope.list_of_string) == false) {
      $scope.list_of_string = $scope.list_of_string.split(",");
    }
    var formData = {
      title: $scope.title,
      content: content,
      descriptive: first30WordsString,
      hashtag: $scope.list_of_string,
    };
    var check = true;
    if (!$scope.title || $scope.title.trim().length === 0) {
      check = false;
      $scope.errTitle = "Title không được bỏ trống!";
    } else if ($scope.title.trim().length > 225) {
      check = false;
      $scope.errTitle = "Title không được vượt quá 225 kí tự!";
    } else {
      check = true;
      $scope.errTitle = "";
    }
    var check1 = true;
    if (!$scope.list_of_string || $scope.list_of_string.length === 0) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được bỏ trống!";
    } else if ($scope.list_of_string.length > 5) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được quá 5 thẻ!";
    } else {
      check1 = true;
      $scope.errHashTag = "";
    }
    if (
      content.trim().replace(/<p>|<\/p>|<br>|&nbsp;|\s+/gi, "").length === 0
    ) {
      check = false;
      $scope.errContent = "Content không được bỏ trống!";
    } else {
      check = true;
      $scope.errContent = "";
    }

    if (check && check1) {
      $http.put(myArticleAPI + "/update-article/" + id, formData).then(
        function (response) {
          toastr.success("Sửa bài viết thành công", "Thông báo!", {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $location.url("/my-article");
        },
        function (error) {
          toastr.error("Sửa bài viết thất bại", "Thông báo!", {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          console.log(error);
        }
      );
    }
  };
  // sửa bài viết rồi gửi phê duyệt
  $scope.updateMyArticleToCensor = function (event) {
    event.preventDefault();
    var content = $("#summernote").summernote("code");
    var strippedText = content.replace(/<\/?[^>]+(>|$)/g, " ");
    var words = strippedText.split(" ");
    var first30Words = words.slice(0, 70);
    var first30WordsString = first30Words.join(" ");
    if (Array.isArray($scope.list_of_string) == false) {
      $scope.list_of_string = $scope.list_of_string.split(",");
    }
    var formData = {
      title: $scope.title,
      content: content,
      descriptive: first30WordsString,
      hashtag: $scope.list_of_string,
      status: $scope.status,
    };
    var check = true;
    if (!$scope.title || $scope.title.trim().length === 0) {
      check = false;
      $scope.errTitle = "Title không được bỏ trống!";
    } else if ($scope.title.trim().length > 225) {
      check = false;
      $scope.errTitle = "Title không được vượt quá 225 kí tự!";
    } else {
      check = true;
      $scope.errTitle = "";
    }
    var check1 = true;
    if (!$scope.list_of_string || $scope.list_of_string.length === 0) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được bỏ trống!";
    } else if ($scope.list_of_string.length > 5) {
      check1 = false;
      $scope.errHashTag = "Hashtag không được quá 5 thẻ!";
    } else {
      check1 = true;
      $scope.errHashTag = "";
    }
    if (
      content.trim().replace(/<p>|<\/p>|<br>|&nbsp;|\s+/gi, "").length === 0
    ) {
      check = false;
      $scope.errContent = "Content không được bỏ trống!";
    } else {
      check = true;
      $scope.errContent = "";
    }
    if (check && check1) {
      $http
        .put(myArticleAPI + "/update-article-to-censor/" + id, formData)
        .then(
          function (response) {
            toastr.success(
              "Đã gửi yêu cầu phê duyệt thành công",
              "Thông báo!",
              {
                timeOut: 1000,
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
              }
            );
            $location.url("/my-article");
          },
          function (error) {
            toastr.error("Gửi yêu cầu phê duyệt thất bại", "Thông báo!", {
              timeOut: 1000,
              closeButton: true,
              progressBar: true,
              positionClass: "toast-top-center",
            });
          }
        );
    }
  };
  // preview bài viết
  $scope.preview = "";

  $scope.showPreview = function () {
    $scope.preview = $("#summernote").summernote("code");
    $("#previewModal").modal("show");
  };

  // intro
  $scope.CompletedEvent = function () {
    console.log("Completed Event called");
  };

  $scope.ExitEvent = function () {
    console.log("Exit Event called");
  };

  $scope.ChangeEvent = function (targetElement) {
    console.log("Change Event called");
    console.log(targetElement);
  };

  $scope.BeforeChangeEvent = function (targetElement) {
    console.log("Before Change Event called");
    console.log(targetElement);
  };

  $scope.AfterChangeEvent = function (targetElement) {
    console.log("After Change Event called");
    console.log(targetElement);
  };

  $scope.IntroOptions = {
    steps: [
      {
        element: document.querySelector("#step1"),
        intro: "This is the first tooltip.",
      },
      {
        element: document.querySelectorAll("#step2")[0],
        intro: "<strong>You</strong> can also <em>include</em> HTML",
        position: "right",
      },
      {
        element: "#step3",
        intro: "More features, more fun.",
        position: "left",
      },
      {
        element: "#step4",
        intro: "Another step.",
        position: "bottom",
      },
      {
        element: "#step5",
        intro: "Get it, use it.",
      },
    ],
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: true,
    exitOnEsc: true,
    nextLabel: "<strong>NEXT!</strong>",
    prevLabel: '<span style="color:green">Previous</span>',
    skipLabel: "Exit",
    doneLabel: "Thanks",
  };

};
