window.historyCtrl = function ($scope, HistoryService) {
  $scope.listHistory = {};
  $scope.isObjectEmpty = function (obj) {
    return Object.keys(obj).length === 0;
  };
  HistoryService.fetchHistories().then(function () {
    $scope.listHistory = HistoryService.getHistory();
  });
};
