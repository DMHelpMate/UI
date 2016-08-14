
angular.module ('dm')
.factory('Campaign', ['$http', function CampaignFactory ($http) {

	return {

		setCamp: function(campaign) {
			localStorage.setItem('play-campaign', campaign);
		},

		getCamp: function () { 
			// return $http ({
			// 	method: 'GET',
			// 	url: '../../campaigns/' + localStorage.getItem ('play-camp-poss') + '/' + localStorage.getItem ('play-camp-id') + '.json' //Replace with document query
			// });
			return localStorage.getItem('play-campaign');
		},
	};

}]);
