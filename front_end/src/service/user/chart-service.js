app.service("ChartService", function ($http) {
  var chartTym = [];
  var chartComment = [];
  var chartStatus = [];
  var chartHistory = [];
  var chartArticle = [];

  this.getChartTym = function () {
    return chartTym;
  };
  this.getChartComment = function () {
    return chartComment;
  };
  this.getChartStatus = function () {
    return chartStatus;
  };
  this.getChartHistory = function () {
    return chartHistory;
  };
  this.getChartArticle = function () {
    return chartArticle;
  };
  this.fetchChartTym = function () {
    return $http.get(chartCountTymAPI).then(
      function (response) {
        if (response.status === 200) {
          chartTym = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.fetchChartStatus = function () {
    return $http.get(chartCountStatusAPI).then(
      function (response) {
        if (response.status === 200) {
          chartStatus = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
  this.fetchChartComment = function () {
    return $http.get(chartCountCommnetAPI).then(
      function (response) {
        if (response.status === 200) {
          chartComment = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchUsersWhoSeeArticleAnyone = function () {
    return $http.get(chartAPI + "/history").then(
      function (response) {
        console.log(response);
        if (response.status === 200) {
          chartHistory = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchNumberArticleByDayInMonth = function () {
    return $http.get(chartAPI + "/article").then(
      function (response) {
        if (response.status === 200) {
          chartArticle = response.data.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
