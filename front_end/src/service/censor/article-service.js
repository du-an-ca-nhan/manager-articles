appCensor.service("CensorArticleService", function ($http) {
  var articles = [];
  var findByArticle = [];
  var articlesOfUser = [];
  var totalPages = [];
  var currentPage = [];
  var totalPagesArticleOfUser = [];
  var currentPageArticleOfUser = [];
  var article = {};
  var articlesByBrowseDate = [];
  var articlesSlide = [];
  var articlesByTym = [];

  this.getArticles = function () {
    return articles;
  };

  this.getArticleById = function () {
    return article;
  };

  this.getTotalPages = function () {
    return totalPages;
  };
  this.getCurrentPage = function () {
    return currentPage;
  };
  this.getArticleByBrowseDate = function () {
    return articlesByBrowseDate;
  };
  this.getArticleSlide = function () {
    return articlesSlide;
  };
  this.getArticleByTym = function () {
    return articlesByTym;
  };

  this.fetchCensorArticles = function (search) {
    var startDate = new Date(Date.parse(search.startDate));
    var timeInMillisStartDate = startDate.getTime() / 1000;
    if (search.startDate == null) {
      timeInMillisStartDate = 0;
    }
    var endDate = new Date(Date.parse(search.endDate));
    var timeInMillisEndDate = endDate.getTime() / 1000;
    if (search.endDate == null) {
      timeInMillisEndDate = 0;
    }
    return $http
      .get(
        censorArticleAPI +
          `?page=` +
          search.page +
          `&sortOrder=` +
          search.sortOrder +
          `&startDate=` +
          timeInMillisStartDate +
          `&endDate=` +
          timeInMillisEndDate
      )
      .then(
        function (response) {
          if (response.status === 200) {
            articles = response.data.data.data;
            console.log(articles);
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

  this.fetchArticlesByTym = function () {
    return $http.get(articleByTymAPI).then(
      function (response) {
        if (response.status === 200) {
          articlesByTym = response.data.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchArticlesSlide = function () {
    return $http.get(articleAPI).then(
      function (response) {
        if (response.status === 200) {
          articlesSlide = response.data.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchArticlesByBrowseDate = function () {
    return $http.get(articleByBrowseDateAPI).then(
      function (response) {
        if (response.status === 200) {
          articlesByBrowseDate = response.data.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.getArticlesOfUser = function () {
    return articlesOfUser;
  };
  this.setArticlesOfUser = function (data) {
    articlesOfUser = data;
  };
  this.getTotalPagesArticleOfUser = function () {
    return totalPagesArticleOfUser;
  };
  this.getCurrentPageArticleOfUser = function () {
    return currentPageArticleOfUser;
  };

  this.getFindByArticle = function () {
    return findByArticle;
  };
  this.setFindByArticle = function (data) {
    findByArticle = data;
  };

  this.fetchArticlesByAuthorId = function (userId, page) {
    return $http
      .get(articleAPI + "/author?userId=" + userId + "&page=" + page)
      .then(
        function (response) {
          if (response.status === 200) {
            articlesOfUser = response.data.data.data;
            totalPagesArticleOfUser = response.data.data.totalPages;
            currentPageArticleOfUser = response.data.data.currentPage;
          }
          return response;
        },
        function (errors) {
          console.log(errors);
        }
      );
  };

  this.fetchArticlesById = function (articleId) {
    return $http.get(articleAPI + "/" + articleId).then(
      function (response) {
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

  this.fetchFindByArticle = function (findArticleRequest) {
    return $http
      .get(
        articleAPI +
          `?title=` +
          findArticleRequest.title +
          `&hashtag=` +
          findArticleRequest.hashtag +
          `&category=` +
          findArticleRequest.category +
          `&categoryId=` +
          findArticleRequest.categoryId +
          `&page=` +
          findArticleRequest.page
      )
      .then(
        function (response) {
          if (response.status === 200) {
            console.log(response);
            findByArticle = response.data.data.data;
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

  this.fetchFindByArticleByCategory = function (findArticleRequest) {
    return $http
      .get(
        articleAPI +
          `/find-article-id-category?categoryId=` +
          findArticleRequest.categoryId +
          `&page=` +
          findArticleRequest.page
      )
      .then(
        function (response) {
          if (response.status === 200) {
            findByArticle = response.data.data.data;
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
    return $http.get(censorArticleAPI + "/" + id).then(
      function (response) {
        if (response.status === 200) {
          article = response.data.data
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
