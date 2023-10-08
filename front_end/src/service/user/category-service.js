app.service("CategoryService", function ($http) {
  var categories = [];
  var searchCategories = [];
  var totalPages = [];
  var currentPage = [];

  this.getCategory = function () {
    return categories;
  };

  this.getSearchCategory = function () {
    return searchCategories;
  };

  this.getTotalPages = function () {
    return totalPages;
  };
  this.getCurrentPage = function () {
    return currentPage;
  };

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

  this.fetchSearchCategories = function (findArticleRequest) {
    return $http
      .get(
        searchNameCategoryAPI +
          `?categoryName=` +
          findArticleRequest.categoryName +
          `&page=` +
          findArticleRequest.page
      )
      .then(
        function (response) {
          if (response.status === 200) {
            searchCategories = response.data.data.data;
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
