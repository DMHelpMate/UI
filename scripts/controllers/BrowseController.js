angular.module('dm')
.controller('BrowseController', ['$http', '$scope', 'Campaign', function($http, $scope, Campaign) {

	//Get user's campaigns
	$http({
		method: 'GET',
		url: '../../campaigns/local/campaign1.json'
	}).then(function(res) {
		$scope.myCamps = res.data;
		console.log(res.data);
	}, function(err) {
		console.log(err);
	});

	//Get community's campaigns
	$http({
		method: 'GET',
		url: '../../campaigns/community/campaign2.json'
	}).then(function(res) {
		$scope.theirCamps = res.data;
	}, function(err) {
		console.log(err);
	});

	$scope.getID = function(camp_id , poss) {
		Campaign.setID(camp_id, poss);
	}

}]);