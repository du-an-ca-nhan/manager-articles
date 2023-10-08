appTrangChu.service("ArticleService", function ($http) {
    var articles = [];
    var totalPages = [];
    var currentPage = [];
  
    this.getArticle = function () {
      return articles;
    };
    this.getTotalPages = function () {
      return totalPages;
    };
    this.getCurrentPage = function () {
      return currentPage;
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
  
   
  });
  