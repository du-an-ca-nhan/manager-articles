appTrangChu.service("HashtagService", function ($http) {
  var hashtags = [];
  var searchHashtags = [];
  var totalPages = [];
  var currentPage = [];

  this.getHashtags = function () {
    return hashtags;
  };
  this.getSearchHashtag = function () {
    return searchHashtags;
  };

  this.getTotalPages = function () {
    return totalPages;
  };
  this.getCurrentPage = function () {
    return currentPage;
  };

  this.fetchTop5HashTag = function () {
    return $http.get(hashtag + "/top-5").then(
      function (response) {
        hashtags = response.data.data;
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.fetchSearchHashtags = function (findArticleRequest) {
    return $http
      .get(
        searchHashtagAPI +
          `?hashtagName=` +
          findArticleRequest.hashtagName +
          `&page=` +
          findArticleRequest.page
      )
      .then(
        function (response) {
          if (response.status === 200) {
            searchHashtags = response.data.data.data;
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
