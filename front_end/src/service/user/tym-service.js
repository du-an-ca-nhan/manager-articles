app.service("TymService", function ($http) {
  var ArticleFavorite = {};

  
  this.getArticleFavorite = function () {
    return ArticleFavorite;
  };
  this.setArticleFavorite = function (data) {
    ArticleFavorite = data;
  };

  var groupByTimePeriod = function (obj, timestamp) {
    var objPeriod = {};
    var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    for (var i = 0; i < obj.length; i++) {
        d = Math.floor(obj[i][timestamp] * 1000 / oneDay);
        objPeriod[d] = objPeriod[d] || [];
        objPeriod[d].push(obj[i]);
    }
    return objPeriod;
};

  this.fetchArticleFavorite = function () {
    return $http.get(tymAPI + "/all-article-favorite").then(
      function (response) {
        ArticleFavorite = groupByTimePeriod(response.data.data, 'createdDate');
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  
});

