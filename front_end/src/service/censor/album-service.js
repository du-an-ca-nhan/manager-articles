appCensor.service("AlbumService", function ($http) {
  var simpleAlbums = [];
  var albumOfAuthor = [];
  var albums = [];
  var album = [];
  var checkAlbumOfAuthor = true;
  var articleByAlbum = [];

  this.getCheckAlbumOfAuthor = function () {
    return checkAlbumOfAuthor;
  };

  this.getAlbums = function () {
    return albums;
  };

  this.getAlbum = function () {
    return album;
  };
  this.setAlbum = function (data) {
    album = data;
  };

  this.getSimpleAlbums = function () {
    return simpleAlbums;
  };

  this.getAlbumOfAuthor = function () {
    return albumOfAuthor;
  };

  this.getArticleByAlbum = function () {
    return articleByAlbum;
  };

  this.fetchAlbums = function () {
    return $http.get(albumAPI).then(
      function (response) {
        albums = response.data.data;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchSimpleAlbums = function (articleId) {
    return $http.get(albumAPI + "/detail-album-user/" + articleId).then(
      function (response) {
        simpleAlbums = response.data.data;
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchAlbum = function (id) {
    return $http.get(albumAPI + "/detail/" + id).then(
      function (response) {
        console.log(123);
        console.log(response);
        album = response.data.data;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchAlbumOfAuthor = function (userId) {
    return $http.get(albumAPI + "/" + userId).then(
      function (response) {
        albumOfAuthor = response.data.data;
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchCheckAlbumOfAuthor = function (id) {
    return $http.get(albumAPI + "/find-album-user/" + id).then(
      function (response) {
        console.log(response);
        if (response.data.data != null) {
          checkAlbumOfAuthor = true;
        } else {
          checkAlbumOfAuthor = false;
        }

        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };

  this.fetchArticleByAlbum = function (id) {
    return $http.get(albumAPI + "/detail-article-by-album?albumId=" + id).then(
      function (response) {
        console.log("bai viet");
        console.log(response);
        articleByAlbum = response.data.data.data;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
