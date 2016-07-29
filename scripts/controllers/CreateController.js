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


//Creating JSON object for the General information for a new Campaign
	var campaigngeneraljson = {
		'title':'',
		'author':'',
		'theme':'',
		'discription':''
	}

	$scope.camptitle = 'Dungeon of Balls';
	$scope.campauthor = 'BallsMandella';
	$scope.camptheme = 'Balls in the Air';
	$scope.campdisc = 'There will be lots of';
    $scope.generalsubmit = function() {
        if ($scope.camptitle) {
          campaigngeneraljson.title = this.camptitle;
        }
        if ($scope.campauthor) {
          campaigngeneraljson.author = this.campauthor;
        }
        if ($scope.camptheme) {
          campaigngeneraljson.theme = this.camptheme;
        }
        if ($scope.campdisc) {
          campaigngeneraljson.discription = this.campdisc;
        }
        console.log(campaigngeneraljson);
    };

//Creating JSON object for the Monsters and Locations information for a new Campaign

//Locations
  $scope.locations = [];
  $scope.location = {};
  $scope.locationsaddrow = function(){  
    $scope.locations.push({ 'lname':$scope.location.lname, 'ldiscription':$scope.location.ldiscription });
    console.log($scope.locations);
  };



//Monsters
  $scope.monsters = [];
  $scope.monster = {};
    $scope.monstersaddrow = function(){  
    $scope.monsters.push({ 'mname':$scope.monster.mname, 'mhitpoints':$scope.monster.mhitpoints, 'mattack':$scope.monster.mattack, 'mdefence':$scope.monster.mdefence });
    console.log($scope.monsters);
  };


//Creating JSON object for the Encounters of a new Campaign
	var encountersjson = [
		{
			'encounterinfo': {
				'name':'',
				'dmnotes':'',
				'readaloud':''
			},
			'location': [],
			'monsters':[]
		}
	]

	$scope.enctrname = 'Encounter at Farpoint';
	$scope.enctrdmnotes = 'Dont read this to those little fuckers';
	$scope.enctrreadaloud = 'Now you can read this to the little shits';
    $scope.enctrsubmit = function() {
        if ($scope.enctrname) {
          encountersjson.title = this.enctrname;
        }
        if ($scope.enctrdmnotes) {
          encountersjson.author = this.enctrdmnotes;
        }
        if ($scope.enctrreadaloud) {
          encountersjson.discription = this.enctrreadaloud;
        }
        console.log(encountersjson);
    };


	$scope.appendToMon = function() {
		var first_row = $('#monRow');
		first_row.clone().appendTo('#monTable');
	}

}]);
