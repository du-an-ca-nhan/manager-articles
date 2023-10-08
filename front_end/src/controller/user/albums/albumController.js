window.albumCtrl = function (
  $scope,
  AlbumService
) {
  $scope.album = [];

  //get all album
  AlbumService.fetchAlbums().then(function () {
    $scope.albums = AlbumService.getAlbums();
    console.log($scope.albums);
  });
};
