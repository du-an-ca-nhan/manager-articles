app.service("UserService", function ($http) {
    var user = {};
    var profileAuthor = {}


    this.getUser = function () {
        return user;
    };
    this.setUser = function (data) {
        user = data;
    };

    this.getProfileAuthor = function () {
        return profileAuthor;
    };
    this.setProfileAuthor = function (data) {
        profileAuthor = data;
    };

    this.fetchDetailUser = function () {
        return $http.get(userAPI + "/my-user-detail").then(
            function (response) {
                response.data.data.map(item =>{
                    user = item;
                })
                return response;
            },
            function (errors) {
                console.log(errors);
            }
        );
    };


    this.fetchProfileAuthor = function (id) {
        return $http.get(userAPI + "/detail/"+ id).then(
            function (response) {
                response.data.data.map(item =>{
                    profileAuthor = item;
                })
                return response;
            },
            function (errors) {
                console.log(errors);
            }
        );
    };

});

