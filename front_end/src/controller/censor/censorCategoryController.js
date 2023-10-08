window.categoryCtrl = function (
  $scope,
  $http,
  $rootScope,
  CensorCategoryService
) {
  var modalAdd = document.getElementById("modalAdd");
  var modalUpdate = document.getElementById("modalUpdate");
  $scope.findCategory = {
    code: "",
    name: "",
    page: 0
  }

  $scope.findCategoryByCodeAndName = function(){
    CensorCategoryService.fetchCategoriesByCensorCrud($scope.findCategory).then(function () {
      $scope.listCategoryCrud = CensorCategoryService.getCategoryByCensorCrud();
      $scope.totalPages = CensorCategoryService.getTotalPages();
      $scope.currentPage = CensorCategoryService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    
    });
  }
  $scope.load = function () {
    CensorCategoryService.fetchCategoriesByCensorCrud($scope.findCategory).then(function () {
      $scope.listCategoryCrud = CensorCategoryService.getCategoryByCensorCrud();
      $scope.totalPages = CensorCategoryService.getTotalPages();
      $scope.currentPage = CensorCategoryService.getCurrentPage();
      $scope.pageModel = $scope.currentPage + 1;
    });
  };
  $scope.nextPage = function () {
    $scope.currentPage++;
    if ($scope.currentPage >= $scope.totalPages) {
      $scope.pageModel = $scope.totalPages;
    }
    CensorCategoryService.fetchCategoriesByCensorCrud($scope.currentPage).then(
      function (respone) {
        $scope.listCategoryCrud =
          CensorCategoryService.getCategoryByCensorCrud();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };
  $scope.prevPage = function () {
    $scope.currentPage--;
    if ($scope.currentPage <= 0) {
      $scope.currentPage = 0;
    }
    CensorCategoryService.fetchCategoriesByCensorCrud($scope.currentPage).then(
      function (respone) {
        $scope.listCategoryCrud =
          CensorCategoryService.getCategoryByCensorCrud();
        $scope.pageModel = $scope.currentPage + 1;
      }
    );
  };

  $scope.load();

  $scope.addCate = function () {
    var formData = {
      name: $scope.name,
    };
    var checkErr = true;
    if ($scope.name == undefined || $scope.name == null || $scope.name == "") {
      checkErr = false;
      $scope.errName = "Vui lòng nhập name!";
    } else if ($scope.name.length > 225) {
      checkErr = false;
      $scope.errName = "Name quá dài!";
    } else {
      checkErr = true;
      $scope.errName = "";
    }
    if (checkErr) {
      $http.post(categoryAPI + "/add-category", formData).then(
        function (res) {
          toastr.success("Thêm category thành công", "Thông báo!", {
            timeOut: 500,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
          $("#modalAdd").modal("hide");
          $scope.load();
        },
        function (error) {
          toastr.error("Thêm không thành công", "Thông báo!", {
            timeOut: 500,
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
          });
        }
      );
    }
  };

  $scope.detail = function (id) {
    $http.get(categoryAPI + "/get-one/" + id).then(function (res) {
      $scope.detailCate = res.data.data;
      $scope.name = $scope.detailCate.name;
      $scope.id = $scope.detailCate.id;
    });
  };
  $scope.updateCate = function (id) {
    var formData = {
      name: $scope.name,
    };
    $http.put(categoryAPI + "/update-category/" + id, formData).then(
      function (res) {
        toastr.success("Update category thành công", "Thông báo!", {
          timeOut: 500,
          closeButton: true,
          progressBar: true,
          positionClass: "toast-top-center",
        });
        $("#modalUpdate").modal("hide");
        $scope.load();
      },
      function (error) {
        toastr.error("Sửa không thành công", "Thông báo!", {
          timeOut: 500,
          closeButton: true,
          progressBar: true,
          positionClass: "toast-top-center",
        });
      }
    );
  };

  $scope.deleteCate = function (id) {
    $http.delete(categoryAPI + "/delete-category/" + id).then(
      function (res) {
        $scope.load();
        toastr.success("Xóa category thành công", "Thông báo!", {
          timeOut: 500,
          closeButton: true,
          progressBar: true,
          positionClass: "toast-top-center",
        });
      },
      function (error) {
        toastr.error(error, "Thông báo!", {
          timeOut: 500,
          closeButton: true,
          progressBar: true,
          positionClass: "toast-top-center",
        });
        console.log(error);
      }
    );
  };
};
