
angular.module('dm')
.controller('BrowseController', ['$http', '$location', '$scope', 'Campaign', function($http, $location, $scope, Campaign) {

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
			'Content-Type': 'application/json',
			'Pragma': 'no-cache'
		}
	}).then(function(res) {
		$scope.theirCamps = res.data;
	}, function(err) {
		console.log(err);
	});

	// get all campaigns
	$http({
		method: 'GET',
		url: 'http://api.unicornrampage.com/campaigns',
		headers: {
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache'
		}
	}).then(function(res) {
		$scope.campaigns = res.data;
		console.log($scope.campaigns);
	}, function(err) {
		console.log(err);
	});

	$scope.getFullCampaign = function(camp_id) {
		console.log('http://api.unicornrampage.com/campaigns?camp_id=' + camp_id);
		$http({
			method: 'GET',
			url: 'http://api.unicornrampage.com/campaigns?camp_id=' + camp_id,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Content-Type': 'application/json'
			}
		}).then(function(res) {
			Campaign.setCamp(angular.toJson(res.data), function() {
				$location.url('/play');
			});
		}, function(err) {
			console.log(err);
		});
	}

	$scope.getID = function(camp_id , poss) {
		Campaign.setID(camp_id, poss);
		$location.url('/play');
	}

}]);
