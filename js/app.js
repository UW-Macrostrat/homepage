(function() {
  angular.module("macrostrat", ["ngRoute"])

    .config(function($routeProvider) {
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

    .controller("ContactController", function($http, $log) {
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