angular.module('dm')
.controller('BrowseController', ['$http', '$scope', function($http, $scope) {
	$scope.hello = 'Hello';

	$http({
		method: 'GET',
		url: '../../campaigns/local/campaign1.json'
	}).then(function(res) {
		$scope.myCamps = res.data;
	}, function(err) {
		console.log(err);
	});

	$http({
		method: 'GET',
		url: '../../campaigns/community/campaign2.json'
	}).then(function(res) {
		$scope.theirCamps = res.data;
	}, function(err) {
		console.log(err);
	});
}]);