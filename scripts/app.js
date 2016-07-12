//(function() {

	var index = angular.module('dm', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
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

		.when('/browse', {
			controller: 'BrowseController',
			templateUrl: '../views/pages/browse.html',
		})

		.otherwise({redirectTo: '/'});
	}]);
 
 //})();