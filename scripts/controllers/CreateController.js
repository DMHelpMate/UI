angular.module('dm')
.controller('CreateController', ['$http', '$scope', function($http, $scope) {

//set active object (general info)
	$scope.activeClass = 'create-general';

//Compare the param to active id
	$scope.isActive = function (id) {;
		return ($scope.activeClass === id);
	}

//Set the active var to an id
	$scope.setActive = function (event) {
		$scope.activeClass = event.target.id;
	}

}]);