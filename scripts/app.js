//(function() {

	var index = angular.module('dm', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider

		.when('/', {
			templateUrl: '../views/pages/home.html',
			controller: 'HomeController'
		})

		.when('/play', {
			templateUrl: '../views/pages/play.html',
			controller: 'PlayController'
		})

		.when('/create', {
			templateUrl: '../views/pages/create.html',
			controller: 'CreateController'
		})

		.when('/browse', {
			controller: 'BrowseController',
			templateUrl: '../views/pages/browse.html',
		})

		.when('/admin', {
			controller: 'AdminController',
			templateUrl: '../views/pages/admin.html'
		})

		.otherwise({redirectTo: '/'});
	}]);
 
 //})();