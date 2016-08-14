
angular.module ('dm')
.factory('Campaign', ['$http', function CampaignFactory ($http) {

	return {

		setCamp: function(campaign, callback) {
			localStorage.setItem('play-campaign', campaign);
			callback();
		},

		getCamp: function (callback) { 
			 callback(localStorage.getItem('play-campaign'));
		},
	};

}]);
