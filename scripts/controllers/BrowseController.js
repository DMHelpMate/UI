angular.module('dm')
.controller('BrowseController', ['$http', '$scope', 'Campaign', function($http, $scope, Campaign) {

	//Get user's campaigns
	$http({
		method: 'GET',
		url: '../../campaigns/local/campaign1.json',
		headers: {
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache'
		}
	}).then(function(res) {
		$scope.myCamps = res.data;
	}, function(err) {
		console.log(err);
	});

	//Get community's campaigns
	$http({
		method: 'GET',
		url: '../../campaigns/community/campaign2.json',
		headers: {
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache'
		}
	}).then(function(res) {
		$scope.theirCamps = res.data;
	}, function(err) {
		console.log(err);
	});

	$scope.getID = function(camp_id , poss) {
		Campaign.setID(camp_id, poss);
	}

}]);