
angular.module('dm')
.controller('PlayController', ['$http', '$scope', 'Campaign', function ($http, $scope, Campaign) {
	
	//Retrieve campaign object
	Campaign.getCamp().then( function (res) {
		$scope.camp = res.data;
	}, function (err) {
		console.log(err);
	});

	$scope.activeClass = 'General';

	//Return if param is an object
	$scope.isObj = function (arr) {
		return (typeof (arr) === 'object');
	}

	//Compare the param to active id
	$scope.isActive = function (id) {
		return (this.activeClass === id);
	}

	//Set the active var to an id
	$scope.setActive = function (event) {
		$scope.activeClass = event.target.id;
	}

}]);
