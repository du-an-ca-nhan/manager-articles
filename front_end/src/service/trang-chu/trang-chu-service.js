appTrangChu.service("TrangChuService", function ($http) {
  var articles = [];
  var findByArticle = [];
  var articlesOfUser = [];
  var totalPages = [];
  var currentPage = [];
  var totalPagesArticleOfUser = [];
  var currentPageArticleOfUser = [];
  var article = {};

  this.getArticle = function () {
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

  this.fetchArticles = function (page) {
    return $http.get(articleAPI + `?page=` + page).then(
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

  this.fetchArticlesByAuthorId = function (userId) {
    return $http.get(articleAPI + "/author?userId=" + userId).then(
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
          `/find-article-category?categoryId=` +
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
});
