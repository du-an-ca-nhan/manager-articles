appReviewer.service("UserService", function ($http) {
  var profileAuthor = {};

  this.getProfileAuthor = function () {
    return profileAuthor;
  };

  this.fetchProfileAuthor = function (id) {
    return $http.get(userAPI + "/detail/" + id).then(
      function (response) {
        response.data.data.map((item) => {
          profileAuthor = item;
        });
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
