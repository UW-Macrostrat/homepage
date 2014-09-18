(function() {
  angular.module("macrostrat", ["ngRoute", "snap", "angular-carousel"])
    .config(function($routeProvider, snapRemoteProvider) {
      $routeProvider
        .when("/", {
          controller: 'RootController',
          templateUrl: "partials/root.html"
        })
        .when("/contact", {
          controller: 'ContactController',
          templateUrl: "partials/contact.html"
        })
        .when("/search", {
          controller: 'SearchController',
          templateUrl: "partials/search.html"
        })
        .when("/publications", {
          controller: 'PublicationsController',
          templateUrl: "partials/publications.html"
        })
        .when("/api", {
          controller: 'ApiController',
          templateUrl: "partials/api.html"
        })
        .otherwise({
          redirectTo: "/"
        });
    })

    .controller('MainCtrl', function($scope, snapRemote, $window) {
      $scope.snapperOpen = false;
      $scope.atTop = true;

      snapRemote.getSnapper().then(function(snapper) {
        
        snapper.on('open', function() {
          $scope.snapperOpen = true;
          var snapContent = document.getElementById("snapContent"),
              style = window.getComputedStyle(snapContent),
              transform = style.getPropertyValue("transform");
        });
        
        snapper.on('close', function() {
          $scope.snapperOpen = false;
        });
        snapper.on("animating", function() {
          $(".navbar-fixed-top").css("visibility", "hidden");
        });
        snapper.on('animated', function() {
          $(".navbar-fixed-top").css("transform", $("snap-content").css("transform"));
          $(".navbar-fixed-top").css("visibility", "visible");
        });
      });

      angular.element($window).bind("resize", function() {
        if ($scope.snapperOpen) {
          snapRemote.getSnapper().then(function(snapper) {
            snapper.close();
          });
        }
      });

      document.getElementById("snapContent").addEventListener("scroll", function(e) {
        if (e.target.scrollTop > 140) {
          $scope.atTop = false;
        } else {
          $scope.atTop = true;
        }
        $scope.$apply();
      });

      // Close the snap drawer when an item is chosen
      $scope.close = function() {
        snapRemote.getSnapper().then(function(snapper) {
          snapper.close();
        });
      };

    })

    .controller("RootController", ['$scope', '$http', '$log', function($scope, $http, $log) {
      $scope.stats = {
        data: [ ]
      };

      $http.get("http://dev.macrostrat.org/api/stats?all")
        .error(function(error) {
          $log.error(error);
        })
        .success(function(data) {
          $scope.stats.data = data.success.data;
        });
    }])

    .controller("ContactController", function($http, $log, $scope) {
      $scope.atTop = false;
      $log.log("Works on contact");
    })

    .controller("SearchController", function($http, $log) {
      $log.log("Works on search")
    })

    .controller("PublicationsController", function($http, $log) {
      $log.log("Works on publications");
    })

    .controller("ApiController", function($http, $log) {
      $log.log("Works on api");
    });
})();


