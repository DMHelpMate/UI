angular.module('dm')
.controller('HomeController', ['$http', '$scope', 'UserHash', function($http, $scope, UserHash) {
	UserHash.createUserHash();
	//UserHash.createObjHash(function(hex) {console.log(hex)});	
	//console.log(UserHash.createObjHash2());
}]);