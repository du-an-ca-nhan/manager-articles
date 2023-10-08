app.service("ArticleTrashService", function ($http) {
  var trashes = {};
  this.getTrash = function () {
    return trashes;
  };
  this.setTrash = function (data) {
    trashes = data;
  };

  var groupByTimePeriod = function (obj, timestamp) {
    var objPeriod = {};
    var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    for (var i = 0; i < obj.length; i++) {
      var d = Math.floor(obj[i][timestamp] / oneDay) * 1000;
      objPeriod[d] = objPeriod[d] || [];
      objPeriod[d].push(obj[i]);
    }
    return objPeriod;
  };

  this.fetchTrashes = function () {
    return $http.get(articleTrashAPI).then(
      function (response) {
        if (response.status === 200) {
          trashes = groupByTimePeriod(response.data.data.data, 'browseDate');
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
