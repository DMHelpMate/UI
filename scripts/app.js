(function() {

	var index = angular.module('dm', ['ngRoute']).config(['$routeProvider', function($routeProvider){
		$routeProvider

		.when('/', {
			templateUrl: '../views/pages/home.html'
		})

		.when('/play', {
			templateUrl: '../views/pages/play.html'
		})

		.when('/create', {
			templateUrl: '../views/pages/create.html'
		})

		.otherwise({redirectTo: '/'});
	}]);
 
 })();