app.controller("myCtrl", function ($scope, $routeParams, $http, $rootScope) {
  $scope.ToolBar = function () {
    Toolbar.allHihi();
  };
  $scope.Summernote = function () {
    Summernote.summer();
  };
  $scope.request = {
    key: "",
    link: "",
  };

  $scope.changeInputSearch = function () {
    $scope.hashtag = "";
    var key = $routeParams.hashtag;
    console.log($routeParams.hashtag);
    if (key != undefined) {
      $scope.hashtag = "&hashtag=" + key;
    }
    $scope.request.link = $scope.request.key + $scope.hashtag;
    console.log($scope.request.link);
  };
  // thông báo
  $scope.notifications = [];
  $scope.currentPage = 0;
  $http.get(notificationAPI + "?page=" + $scope.currentPage).then(
    function (response) {
      if (response.status === 200) {
        $scope.notifications = $scope.notifications.concat(
          response.data.data.data
        );
        $scope.totalPages = response.data.data.totalPages;
        $scope.currentPage++;
      }
    },
    function (errors) {
      console.log(errors);
    }
  );
  // Load more
  $scope.loadMore = function () {
    $http.get(notificationAPI + "?page=" + $scope.currentPage).then(
      function (response) {
        console.log(response.data.data.data);
        if (response.status === 200) {
          $scope.notifications = $scope.notifications.concat(
            response.data.data.data
          );
          $scope.currentPage++;
        }
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  // count thông báo

  $rootScope.countNotifications = 0;

  $scope.thongBao = function () {
    $http.get(countNotificationAPI).then(function (response) {
      $rootScope.countNotifications = response.data;
    });
  };

  $scope.thongBao();
  // tính giờ
  $scope.getNotificationTime = function (createdDate) {
    var now = new Date();
    var elapsed = now - createdDate;
    if (elapsed < 60000) {
      return Math.floor(elapsed / 1000) + "s ago";
    } else if (elapsed < 3600000) {
      return Math.floor(elapsed / 60000) + "m ago";
    } else if (elapsed < 86400000) {
      return Math.floor(elapsed / 3600000) + "h ago";
    } else {
      return Math.floor(elapsed / 86400000) + "d ago";
    }
  };
  // update trạng thái thông báo thành đã xem
  $scope.status = false;
  $scope.updateNotificationStatus = function (id) {
    $http.get(notificationAPI + "/get-one/" + id).then(function (res) {
      $scope.getOneNotification = res.data.data;
      $scope.status = $scope.getOneNotification.status;
      if ($scope.status == false) {
        $scope.status = true;
        $scope.statusNew = $scope.status ? 1 : 0;
        $http
          .put(notificationAPI + "/update-status/" + id, $scope.statusNew)
          .then(
            function (response) {
              $scope.thongBao();
              $scope.notifications.forEach(function (notification) {
                if (notification.id === id) {
                  notification.status = true;
                }
              });
            },
            function (errors) {
              console.log("not ok");
            }
          );
      } else {
        return;
      }
    });
  };
  // xóa thong báo

  $scope.deleteNotification = function (id) {
    $http
      .delete(notificationAPI + "/delete-notification/" + id)
      .then(function (response) {
        $scope.thongBao();
        $http.get(notificationAPI).then(
          function (response) {
            if (response.status === 200) {
              $scope.notifications = response.data.data.data;
            }
          },
          function (errors) {
            console.log(errors);
          }
        );
        alert("ok");
      });
  };
});

app.directive("myTooltip", function () {
  return {
    restrict: "A",
    scope: {
      tooltipContent: "@",
    },
    link: function (scope, element, attrs) {
      $(element).attr("data-bs-toggle", "tooltip");
      $(element).attr("title", scope.tooltipContent);
      $(element).attr("data-bs-placement", "top");
      $(element).tooltip();
      $(element).click(function () {
        $(element).tooltip("dispose");
      });
      $(element).mouseenter(function () {
        $(element).tooltip();
      });
      scope.$watch("tooltipContent", function (newVal) {
        $(element).tooltip("dispose");
        $(element).attr("data-bs-toggle", "tooltip");
        $(element).attr("title", newVal);
        $(element).attr("data-bs-placement", "top");
        $(element).tooltip();
      });
    },
  };
});
