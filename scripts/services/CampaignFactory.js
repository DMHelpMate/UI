
angular.module ('dm')
.factory('Campaign', ['$http', function CampaignFactory ($http) {

	return {
		setID: function (camp_id, poss) { 
			localStorage.setItem ('play-camp-id', camp_id); 
			localStorage.setItem ('play-camp-poss', poss);
		},

		getCamp: function () { 
			return $http ({
				method: 'GET',
				url: '../../campaigns/' + localStorage.getItem ('play-camp-poss') + '/' + localStorage.getItem ('play-camp-id') + '.json' //Replace with document query
			});
		},
	};

}]);
