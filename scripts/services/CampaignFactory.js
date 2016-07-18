angular.module('dm')
.factory('Campaign', ['$http', function CampaignFactory($http) {
	
	//Document _id for http GET
	var id = 0;

	//Community or local
	var	possession = '';

	return {
		setID: function(camp_id, poss) { 
			id = camp_id; 
			possession = poss;
		},

		getCamp: function() { 
			return $http({
				method: 'GET',
				url: '../../campaigns/' + possession + '/' + id + '.json' //Replace with document query
			});
		},

	};

}]);