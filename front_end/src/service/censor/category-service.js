appCensor.service("CensorCategoryService", function ($http) {
  var categories = [];
  var categoriesByCensor = [];
  var categoriesByCensorCrud = [];
  var totalPages = [];
  var currentPage = [];
  this.getCategory = function () {
    return categories;
  };

  this.getCategoryByCensor = function () {
    return categoriesByCensor;
  };

  this.getCategoryByCensorCrud = function () {
    return categoriesByCensorCrud;
  };
  this.getTotalPages = function () {
    return totalPages;
  };
  this.getCurrentPage = function () {
    return currentPage;
  };
  // màn user, trang chủ
  this.fetchCategories = function () {
    return $http.get(categoryAPI).then(
      function (response) {
        if (response.status === 200) {
          categories = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  // màn censor khi get trong combobox
  this.fetchCategoriesByCensor = function () {
    return $http.get(censorCategoryAPI).then(
      function (response) {
        if (response.status === 200) {
          categoriesByCensor = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  // màn censor khi curd
  this.fetchCategoriesByCensorCrud = function (findCategory) {
    return $http.get(censorCrudCategoryAPI + "?page=" + findCategory.page + "&code="+ findCategory.code + "&name="+ findCategory.name).then(
      function (response) {
        console.log(response);
        if (response.status === 200) {
          categoriesByCensorCrud = response.data.data.data;
          totalPages = response.data.data.totalPages;
          currentPage = response.data.data.currentPage;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
