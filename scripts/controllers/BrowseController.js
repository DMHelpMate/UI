
angular.module('dm')
.controller('BrowseController', ['$http', '$location', '$scope', 'Campaign', function($http, $location, $scope, Campaign) {

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

	// query for full campaign details
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

}]);
