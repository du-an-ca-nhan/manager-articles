app.service("MyArticleService", function ($http) {
  var myArticle = [];
  var myArticleById = {};
  var myUpdateArticleById = {};
  var myArticleByStatus = [];
  var myArticleByUser = [];
  var totalPages = [];
  var currentPage = [];
  var totalPagesByUser = [];
  var currentPageByUser = [];

  this.getMyArticle = function () {
    return myArticle;
  };
  this.getMyUpdateArticleById = function () {
    return myUpdateArticleById;
  };
  this.getMyArticleById = function () {
    return myArticleById;
  };
  this.getMyArticleByStatus = function () {
    return myArticleByStatus;
  };
  this.getMyArticleByUser = function () {
    return myArticleByUser;
  };
  this.getTotalPages = function () {
    return totalPages;
  };
  this.getCurrentPage = function () {
    return currentPage;
  };
  this.getTotalPagesByUser = function () {
    return totalPagesByUser;
  };
  this.getCurrentPageByUser = function () {
    return currentPageByUser;
  };

  this.fetchMyArticles = function () {
    return $http.get(myArticleAPI).then(
      function (response) {
        if (response.status === 200) {
          myArticle = response.data.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.fetchMyArticlesByUser = function (page) {
    return $http.get(myArticleAPI + `?page=` + page).then(
      function (response) {
        if (response.status === 200) {
          myArticleByUser = response.data.data.data;
          totalPagesByUser = response.data.data.totalPages;
          currentPageByUser = response.data.data.currentPage;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.fetchUpdateMyArticleById = function (id) {
    return $http.get(myArticleAPI + "/detail-update-my-article/" + id).then(
      function (response) {
        if (response.status === 200) {
          myUpdateArticleById = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.fetchMyArticleById = function (id) {
    return $http.get(myArticleAPI + "/detail-my-article/" + id).then(
      function (response) {
        if (response.status === 200) {
          myArticleById = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchMyArticlesByStatus = function (api, page) {
    return $http.get(api + "&page=" + page).then(
      function (response) {
        if (response.status === 200) {
          myArticleByStatus = response.data.data.data;
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
