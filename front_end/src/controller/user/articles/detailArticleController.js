window.detailArticleCtrl = function (
  $scope,
  $http,
  $routeParams,
  CommentService,
  MyArticleService,
  UserService,
  $rootScope,
  $route
) {
  $scope.comment = {
    articlesId: $routeParams.id,
    content: "",
  };
  $scope.myArticleById = {};

  $scope.index = -1;

  $scope.replyCommentUser = {
    articlesId: $routeParams.id,
    content: "",
    reply: "",
  };
  // detail bài viết
  MyArticleService.fetchMyArticleById($routeParams.id).then(function () {
    $scope.myArticleById = MyArticleService.getMyArticleById();
    if ($scope.myArticleById.hashtag == null) {
    } else {
      $scope.select2Options = {
        multiple: true,
        simple_tags: true,
        tags: $scope.myArticleById.hashtag.split(","),
        tokenSeparators: ["/", ",", ";", " "],
      };
    }
  });
  // get comment
  CommentService.fetchComments($routeParams.id).then(function () {
    $scope.comments = CommentService.getListCommentByArticle();
  });
  // get user
  UserService.fetchDetailUser().then(function (respone) {
    $scope.detailUser = UserService.getUser();
  });
  // xóa bài viết
  $scope.deleteMyArticle = function () {
    if (confirm("Bạn có chắc muốn xóa?")) {
      $http
        .delete(myArticleAPI + "/delete-article-to-trash/" + $routeParams.id)
        .then(
          function (response) {
            toastr.success("Xóa thành công", "Thông báo!", {
              timeOut: 1000,
              closeButton: true,
              progressBar: true,
              positionClass: "toast-top-center",
            });
            $route.reload();
          },
          function (error) {
            toastr.error("Có lỗi xảy ra", "Thông báo!", {
              timeOut: 5000,
              closeButton: true,
              progressBar: true,
              positionClass: "toast-top-center",
            });
            console.log(error);
          }
        );
    } else {
      toastr.info("Đã hủy xóa");
    }
  };
  $scope.comments = [];
  // realtime
  const socket = new SockJS(
    "http://localhost:6868/portal-articles-websocket-endpoint"
  );

  const stompClient = Stomp.over(socket);
  $scope.unsubStompClient = function () {
    let subscriptions = stompClient.subscriptions;

    for (let id in subscriptions) {
      stompClient.unsubscribe(id);
    }
  };

  $scope.$on("$locationChangeStart", function (event, next, current) {
    if (next.indexOf("/my-article/") === -1) {
      $scope.unsubStompClient();
    }
  });
  stompClient.connect({}, function (frame) {
    let sessionId = /\/([^\/]+)\/websocket/.exec(
      stompClient.ws._transport.url
    )[1];
    stompClient.subscribe(
      "/portal-articles/create-comment/" + $routeParams.id,
      function (message) {
        let objComment = JSON.parse(message.body).data.comment;
        let objUser = JSON.parse(message.body).data.user;
        let newObj = {
          id: objComment.id,
          content: objComment.content,
          reply: objComment.reply,
          userID: objUser.id,
          userImg: objUser.img,
          userName: objUser.name,
          createdDate: objComment.createdDate,
          children: [],
        };
        if ($scope.index == -1) {
          $scope.comments.push(newObj);
        } else {
          $scope.comments[$scope.index].children.push(newObj);
          $scope.index = -1;
        }
        $scope.$apply();
      }
    );
    stompClient.subscribe(
      "/portal-articles/create-notification-user/" + idUser,
      function (message) {
        $rootScope.countNotifications = JSON.parse(message.body).data;
        $scope.$apply();
      }
    );
  });

  $scope.createComment = function () {
    if ($scope.comment.content.trim().length >= 6) {
      $scope.index = -1;
      stompClient.send(
        "/action/create-comment/" + $routeParams.id,
        {},
        JSON.stringify($scope.comment)
      );
      setTimeout(() => {
        stompClient.send("/action/create-notification-user/" + idUser, {});
      }, 500);
    }
  };

  $scope.contentOfReplyValue = {
    value: "",
  };

  $scope.replyComment = function (id, userName) {
    [...document.querySelectorAll(".fromReplyComment")].map((item) => {
      item.style.display = "none";
    });
    var reply = document.getElementById(id);
    const parent = $scope.comments.find((item) => {
      if (findParentComment(item, id)) return item.id;
    });
    console.log(parent);
    const index = $scope.comments.findIndex((item) => parent.id == item.id);
    console.log(index);
    reply.style.display = "block";
    $scope.replyCommentUser.reply = id;
    $scope.replyCommentUser.content = "@" + userName + " ";
    $scope.index = index;
  };

  function findParentComment(root, id) {
    if (!root) return false;
    if (root.id === id) return true;
    if (root.children) {
      for (let i = 0; i < root.children.length; i++) {
        const child = root.children[i];
        if (child.id === id) {
          return true;
        } else {
          const parent = findParentComment(child, id);
          if (parent) return true;
        }
      }
    }
    return false;
  }

  $scope.closeForm = function (id) {
    var reply = document.getElementById(id);
    reply.style.display = "none";
    $scope.index = -1;
  };
  $scope.CreateReplyComment = function (id) {
    if ($scope.replyCommentUser.content.trim().length >= 6) {
      var reply = document.getElementById(id);
      reply.style.display = "none";

      stompClient.send(
        "/action/create-comment/" + $routeParams.id,
        {},
        JSON.stringify($scope.replyCommentUser)
      );
    }
  };

  // begin tym article
  $scope.favoriteArticle = function (id) {
    $scope.createTymRequest = {
      articlesId: id,
    };
    $http
      .post(tymAPI + "/favorite-article", $scope.createTymRequest)
      .then(function (respone) {
        $scope.myArticleById.favorite = 1;
        $scope.myArticleById.tym++;
      });
  };
  $scope.unfavoriteArticle = function (id) {
    $http.delete(tymAPI + "/unfavorite-article/" + id).then(function (respone) {
      $scope.myArticleById.favorite = 0;
      $scope.myArticleById.tym--;
    });
  };
  // end tym article
};
