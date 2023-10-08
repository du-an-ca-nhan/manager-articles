appReviewer.service("ReviewerArticleService", function ($http) {
  var articles = [];
  var totalPages = [];
  var currentPage = [];
  var article = {};

  this.getArticles = function () {
    return articles;
  };
  this.getTotalPages = function () {
    return totalPages;
  };
  this.getCurrentPage = function () {
    return currentPage;
  };

  this.getArticleById = function () {
    return article;
  };

  this.fetchArticles = function (search) {
    var startDate = new Date(Date.parse(search.startDate));
    var timeInMillisStartDate = startDate.getTime();
    if (search.startDate == null) {
      timeInMillisStartDate = 0;
    }
    var endDate = new Date(Date.parse(search.endDate));
    var timeInMillisEndDate = endDate.getTime();
    if (search.endDate == null) {
      timeInMillisEndDate = 0;
    }
console.log(search.page);
    return $http
      .get(
        reviewerArticleAPI +
          `?page=` +
          search.page +
          `&sortOrder=` +
          search.sortOrder +
          `&startDate=` +
          Math.floor(timeInMillisStartDate) +
          `&endDate=` +
          Math.floor(timeInMillisEndDate)
      )
      .then(
        function (response) {
          if (response.status === 200) {
            articles = response.data.data.data;
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

  this.fetchArticleById = function (id) {
    return $http.get(reviewerArticleAPI + "/" + id).then(
      function (response) {
        console.log(response);
        if (response.status === 200) {
          article = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
