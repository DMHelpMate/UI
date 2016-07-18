angular.module('dm')
.controller('PlayController', ['$http', '$scope', 'Campaign', function($http, $scope, Campaign) {

	Campaign.getCamp().then(function(res) {
		$scope.camp = res.data;
		console.log($scope.camp);
	}, function(err) {
		console.log(err);
	});

}]);