angular.module('dm')
.controller('HomeController', ['$http', '$scope', 'UserHash', function($http, $scope, UserHash) {

	UserHash.createUserHash();
	console.log(localStorage.getItem('user-hash'));

}]);