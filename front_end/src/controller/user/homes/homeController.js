window.homeCtrl = function (
  $scope,
  ArticleService,
  CategoryService,
  $http,
  $rootScope
) {
  $scope.listArticleByBrowseDate = [];
  CategoryService.fetchCategories().then(function () {
    $scope.listCategory = CategoryService.getCategory();
  });

  ArticleService.fetchArticlesByBrowseDate().then(function (respone) {
    $scope.listArticleByBrowseDate = ArticleService.getArticleByBrowseDate();
  });

  ArticleService.fetchArticlesSlide().then(function (respone) {
    $scope.listArticleSlide = ArticleService.getArticleSlide();
    
  });

  ArticleService.fetchArticlesByTym().then(function (respone) {
    $scope.listArticleByTym = ArticleService.getArticleByTym();
    console.log($scope.listArticleByTym);
  });

  // begin tym article

  const socket = new SockJS(
    "http://localhost:6868/portal-articles-websocket-endpoint"
  );
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe(
      "/portal-articles/create-notification-tym-user/" + idUser,
      function (message) {
        $rootScope.countNotifications = JSON.parse(message.body).data;
        $scope.$apply();
      }
    );
  });
  $scope.favoriteArticle = function (id, index) {
    $scope.createTymRequest = {
      articlesId: id,
    };
    $http
      .post(tymAPI + "/favorite-article", $scope.createTymRequest)
      .then(function (respone) {
        $scope.article = $scope.listArticleByBrowseDate[index];
        $scope.article.tym += 1;
        $scope.article.favorite = 1;
        $scope.listArticleByBrowseDate.splice(index, 1, $scope.article);
        //begin find article 
        const indexArticleSlide = $scope.listArticleSlide.findIndex(item => 
          id == item.id
        );
        if(indexArticleSlide != -1){
          $scope.articleSlide = $scope.listArticleSlide[indexArticleSlide];
          $scope.articleSlide.tym += 1;
          $scope.articleSlide.favorite = 1;
          $scope.listArticleSlide.splice(indexArticleSlide, 1, $scope.articleSlide);
        }
        const indexArticleByTym = $scope.listArticleByTym.findIndex(item => 
          id == item.id
        );
        if(indexArticleByTym != -1){
          $scope.articleByTym = $scope.listArticleByTym[indexArticleByTym];
          $scope.articleByTym.tym += 1;
          $scope.articleByTym.favorite = 1;
          $scope.listArticleByTym.splice(indexArticleByTym, 1, $scope.articleByTym);
        }
        // end
        stompClient.send("/action/create-notification-tym-user/" + idUser, {});
      });
  };

  $scope.unfavoriteArticle = function (id, index) {
    if ($scope.listArticleByBrowseDate[index].tym >= 0) {
      $http
        .delete(tymAPI + "/unfavorite-article/" + id)
        .then(function (respone) {
          $scope.article = $scope.listArticleByBrowseDate[index];
          $scope.article.tym -= 1;
          $scope.article.favorite = 0;
          $scope.listArticleByBrowseDate.splice(index, 1, $scope.article);
          //begin find article 
        const indexArticleSlide = $scope.listArticleSlide.findIndex(item => 
          id == item.id
        );
        if(indexArticleSlide != -1){
          $scope.articleSlide = $scope.listArticleSlide[indexArticleSlide];
          $scope.articleSlide.tym -= 1;
          $scope.articleSlide.favorite = 0;
          $scope.listArticleSlide.splice(indexArticleSlide, 1, $scope.articleSlide);
        }
        const indexArticleByTym = $scope.listArticleByTym.findIndex(item => 
          id == item.id
        );
        if(indexArticleByTym != -1){
          $scope.articleByTym = $scope.listArticleByTym[indexArticleByTym];
          $scope.articleByTym.tym -= 1;
          $scope.articleByTym.favorite = 0;
          $scope.listArticleByTym.splice(indexArticleByTym, 1, $scope.articleByTym);
        }
        // end
        });
    }
  };
  $scope.favoriteArticleSlide = function (id, index) {
    $scope.createTymRequest = {
      articlesId: id,
    };
    $http
      .post(tymAPI + "/favorite-article", $scope.createTymRequest)
      .then(function (respone) {
        $scope.article = $scope.listArticleSlide[index];
        $scope.article.tym += 1;
        $scope.article.favorite = 1;
        $scope.listArticleSlide.splice(index, 1, $scope.article);
        //begin find article 
        const indexArticleByBrowseDate = $scope.listArticleByBrowseDate.findIndex(item => 
          id == item.id
        );
        if(indexArticleByBrowseDate != -1){
          $scope.articleByBrowseDate = $scope.listArticleByBrowseDate[indexArticleByBrowseDate];
          $scope.articleByBrowseDate.tym += 1;
          $scope.articleByBrowseDate.favorite = 1;
          $scope.listArticleByBrowseDate.splice(indexArticleByBrowseDate, 1, $scope.articleByBrowseDate);
        }
        const indexArticleByTym = $scope.listArticleByTym.findIndex(item => 
          id == item.id
        );
        if(indexArticleByTym != -1){
          $scope.articleByTym = $scope.listArticleByTym[indexArticleByTym];
          $scope.articleByTym.tym += 1;
          $scope.articleByTym.favorite = 1;
          $scope.listArticleByTym.splice(indexArticleByTym, 1, $scope.articleByTym);
        }
        // end
        stompClient.send("/action/create-notification-tym-user/" + idUser, {});
      });
  };

  $scope.unfavoriteArticleSlide = function (id, index) {
    if ($scope.listArticleSlide[index].tym >= 0) {
      $http
        .delete(tymAPI + "/unfavorite-article/" + id)
        .then(function (respone) {
          $scope.article = $scope.listArticleSlide[index];
          $scope.article.tym -= 1;
          $scope.article.favorite = 0;
          $scope.listArticleSlide.splice(index, 1, $scope.article);
          //begin find article 
        const indexArticleByBrowseDate = $scope.listArticleByBrowseDate.findIndex(item => 
          id == item.id
        );
        if(indexArticleByBrowseDate != -1){
          $scope.articleByBrowseDate = $scope.listArticleByBrowseDate[indexArticleByBrowseDate];
          $scope.articleByBrowseDate.tym -= 1;
          $scope.articleByBrowseDate.favorite = 0;
          $scope.listArticleByBrowseDate.splice(indexArticleByBrowseDate, 1, $scope.articleByBrowseDate);
        }
        const indexArticleByTym = $scope.listArticleByTym.findIndex(item => 
          id == item.id
        );
        if(indexArticleByTym != -1){
          $scope.articleByTym = $scope.listArticleByTym[indexArticleByTym];
          $scope.articleByTym.tym -= 1;
          $scope.articleByTym.favorite = 0;
          $scope.listArticleByTym.splice(indexArticleByTym, 1, $scope.articleByTym);
        }
        // end
        });
    }
  };
  $scope.favoriteArticleByTym = function (id, index) {
    $scope.createTymRequest = {
      articlesId: id,
    };
    $http
      .post(tymAPI + "/favorite-article", $scope.createTymRequest)
      .then(function (respone) {
        $scope.article = $scope.listArticleByTym[index];
        $scope.article.tym += 1;
        $scope.article.favorite = 1;
        $scope.listArticleByTym.splice(index, 1, $scope.article);
        //begin find article 
        const indexArticleByBrowseDate = $scope.listArticleByBrowseDate.findIndex(item => 
          id == item.id
        );
        if(indexArticleByBrowseDate != -1){
          $scope.articleByBrowseDate = $scope.listArticleByBrowseDate[indexArticleByBrowseDate];
          $scope.articleByBrowseDate.tym += 1;
          $scope.articleByBrowseDate.favorite = 1;
          $scope.listArticleByBrowseDate.splice(indexArticleByBrowseDate, 1, $scope.articleByBrowseDate);
        }
        const indexArticleSlide = $scope.listArticleSlide.findIndex(item => 
          id == item.id
        );
        if(indexArticleSlide != -1){
          $scope.articleSlide = $scope.listArticleSlide[indexArticleSlide];
          $scope.articleSlide.tym += 1;
          $scope.articleSlide.favorite = 1;
          $scope.listArticleSlide.splice(indexArticleSlide, 1, $scope.articleSlide);
        }
        // end
        stompClient.send("/action/create-notification-tym-user/" + idUser, {});
      });
  };

  $scope.unfavoriteArticleByTym = function (id, index) {
    if ($scope.listArticleByTym[index].tym >= 0) {
      $http
        .delete(tymAPI + "/unfavorite-article/" + id)
        .then(function (respone) {
          $scope.article = $scope.listArticleByTym[index];
          $scope.article.tym -= 1;
          $scope.article.favorite = 0;
          $scope.listArticleByTym.splice(index, 1, $scope.article);
           //begin find article 
        const indexArticleByBrowseDate = $scope.listArticleByBrowseDate.findIndex(item => 
          id == item.id
        );
        if(indexArticleByBrowseDate != -1){
          $scope.articleByBrowseDate = $scope.listArticleByBrowseDate[indexArticleByBrowseDate];
          $scope.articleByBrowseDate.tym -= 1;
          $scope.articleByBrowseDate.favorite = 0;
          $scope.listArticleByBrowseDate.splice(indexArticleByBrowseDate, 1, $scope.articleByBrowseDate);
        }
        const indexArticleSlide = $scope.listArticleSlide.findIndex(item => 
          id == item.id
        );
        if(indexArticleSlide != -1){
          $scope.articleSlide = $scope.listArticleSlide[indexArticleSlide];
          $scope.articleSlide.tym -= 1;
          $scope.articleSlide.favorite = 0;
          $scope.listArticleSlide.splice(indexArticleSlide, 1, $scope.articleSlide);
        }
        // end
        });
    }
  };
  // end tym article
};
