window.chartCtrl = function ($scope, ChartService) {
  //<!-- Biểu đồ cột tym -->
  $scope.columnChartTym = function () {
    ChartService.fetchChartTym().then(function () {
      $scope.listTym = ChartService.getChartTym();
    });
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Bài viết");
      data.addColumn("number", "Số lượng Tym");
      data.addColumn({ type: "string", role: "style" });

      var listTym = ChartService.getChartTym();

      listTym.forEach(function (item, index) {
        var color = "";
        if (index % 2 === 0) {
          color = "color: #FF0000";
        } else {
          color = "color: #00FF00";
        }
        data.addRow([item.title, parseInt(item.numberTym), color]);
      });

      var chart = new google.visualization.ColumnChart(
        document.getElementById("chart_column_tym_div")
      );
      var options = {
        title: "Biểu đồ số lượng Tym theo bài viết",
        width: 1000,
        height: 500,
      };
      chart.draw(data, options);
    }
  };
  $scope.columnChartTym();
  //<!-- Biểu đồ cột comment -->
  $scope.columnChartComment = function () {
    ChartService.fetchChartComment().then(function () {
      $scope.listComment = ChartService.getChartComment();
    });
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Bài viết");
      data.addColumn("number", "Số lượng Comment");
      data.addColumn({ type: "string", role: "style" });

      var listComment = ChartService.getChartComment();

      listComment.forEach(function (item, index) {
        var color = "";
        if (index % 2 === 0) {
          color = "color: #0000FF";
        } else {
          color = "color: #FF00FF";
        }
        data.addRow([item.title, parseInt(item.numberComment), color]);
      });

      var chart = new google.visualization.ColumnChart(
        document.getElementById("chart_column_comment_div")
      );
      var options = {
        title: "Biểu đồ số lượng Comment theo bài viết",
        width: 1000,
        height: 500,
      };
      chart.draw(data, options);
    }
  };
  $scope.columnChartComment();
  //   Biểu đồ tròn hiển thị trạng thái bài viết
  $scope.circleChart = function () {
    ChartService.fetchChartStatus().then(function () {
      $scope.listStatus = ChartService.getChartStatus();
      drawChart();
    });
    function getStatusLabel(status) {
      switch (status) {
        case "1":
          return "Bản nháp, BN";
        case "2":
          return "Chờ phê duyệt, CPD";
        case "3":
          return "Đã phê duyệt, DPD";
        case "4":
          return "Đã bị hủy, DBH";
        default:
          return "";
      }
    }
    function drawChart() {
      var dataArray = [["Articles", "Number of Articles"]];
      for (var i = 0; i < $scope.listStatus.length; i++) {
        var status = $scope.listStatus[i].status;
        var count = $scope.listStatus[i].numberArticle;
        var countNumber = parseInt(count);
        var label = getStatusLabel(status);
        var row = [label, countNumber];
        dataArray.push(row);
      }
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChartCallback);

      function drawChartCallback() {
        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
          title: "Tỉ lệ bài viết theo trạng thái",
          is3D: true,
        };
        var chart = new google.visualization.PieChart(
          document.getElementById("chart_circle_div")
        );
        chart.draw(data, options);
      }
    }
  };

  $scope.circleChart();
  //<!-- Biểu đồ miền -->
  $scope.domainChart = function () {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Ngày");
      data.addColumn("number", "Số lượng bài viết");
      data.addRows([
        ["2023-05-01", 10],
        ["2023-05-02", 15],
        ["2023-05-03", 12],
        // Thêm dữ liệu ngày khác vào đây
      ]);

      var options = {
        title: "Thống kê số lượng bài viết theo ngày",
        curveType: "function", // Đường cong mượt
        legend: { position: "bottom" },
        hAxis: {
          title: "Ngày",
        },
        vAxis: {
          title: "Số lượng bài viết",
        },
      };

      var chart = new google.visualization.LineChart(
        document.getElementById("chart_domain_div")
      );
      chart.draw(data, options);
    }
  };

  $scope.domainChartHistory = function () {
    var dataArray = [];
    ChartService.fetchUsersWhoSeeArticleAnyone().then(function () {
      $scope.listHistoryNumberArticle = ChartService.getChartHistory();
      for (var i = 0; i < $scope.listHistoryNumberArticle.length; i++) {
        var userName = $scope.listHistoryNumberArticle[i].userName;
        var view = $scope.listHistoryNumberArticle[i].view;
        var countNumber = parseInt(view);
        var label = userName;
        var row = [label, countNumber];
        dataArray.push(row);
      }
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "user");
        data.addColumn("number", "Số lượng bài viết xem");
        data.addRows(dataArray);
        console.log(data);
        var options = {
          title: "Thống kê người dùng xem nhiều nhất",
          curveType: "function", // Đường cong mượt
          legend: { position: "bottom" },
          hAxis: {
            title: "Ngày",
          },
          vAxis: {
            title: "Số lượng bài viết",
          },
        };

        var chart = new google.visualization.LineChart(
          document.getElementById("chart_domain_history")
        );
        chart.draw(data, options);
      }
    });
  };

  $scope.domainChartArticle = function () {
    var dataArray = [];
    ChartService.fetchNumberArticleByDayInMonth().then(function () {
      $scope.listHistoryNumberArticle = ChartService.getChartArticle();
      for (var i = 0; i < $scope.listHistoryNumberArticle.length; i++) {
        var day = $scope.listHistoryNumberArticle[i].day;
        var numberArticle = $scope.listHistoryNumberArticle[i].numberArticle;
        var countNumber = parseInt(numberArticle);
        var label = day;
        var row = [label, countNumber];
        dataArray.push(row);
      }
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "user");
        data.addColumn("number", "Số lượng bài viết");
        data.addRows(dataArray);
        console.log(data);
        var options = {
          title: "Thống kê số lượng bài viết trong tháng",
          curveType: "function", // Đường cong mượt
          legend: { position: "bottom" },
          hAxis: {
            title: "Ngày",
          },
          vAxis: {
            title: "Số lượng bài viết",
          },
        };

        var chart = new google.visualization.LineChart(
          document.getElementById("chart_domain_article")
        );
        chart.draw(data, options);
      }
    });
  };
  $scope.domainChartArticle();
  $scope.domainChartHistory();
  //<!-- Biểu đồ -->
  $scope.chart = function () {};

  $scope.chart();
};
