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


//Creating GENERAL-INFO JSON object for a new Campaign
	var campaigngeneraljson = {
		'title':'',
		'author':'',
		'theme':'',
		'discription':''
	}
  $scope.generalsubmit = function() {
    campaigngeneraljson.title = this.camptitle;
    campaigngeneraljson.author = this.campauthor;
    campaigngeneraljson.theme = this.camptheme;
    campaigngeneraljson.discription = this.campdisc;
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


//Creating ENCOUNTERS JSON object for a new Campaign

	var encountersjson = [
		{
			'encounterinfo': {
				'name':'',
        'location': '',
				'dmnotes':'',
				'readaloud':''
			},
			'monsters':[]
		}
	]

  $scope.enctrmonsters = [];
  $scope.enctrmonster = {
    'enctmonster': '',
    'mcount': ''
  };

	$scope.enctrname = 'Encounter at Farpoint';
	$scope.enctrdmnotes = 'Dont read this to those little fuckers';
	$scope.enctrreadaloud = 'Now you can read this to the little shits';
  $scope.enctrsubmit = function() {
    encountersjson.title = this.enctrname;
    encountersjson.author = this.enctrdmnotes;
    encountersjson.discription = this.enctrreadaloud;
    encountersjson.location = this.selectencounterlocation;
    console.log(encountersjson);
  };
  $scope.addmonstertoencounter = function(){  
    $scope.enctrmonster.enctmonster = this.selectencountermonster;
    $scope.enctrmonster.mcount = this.enctrmonsterscount;
    console.log($scope.enctrmonster);
    $scope.enctrmonsters.push({ 'enctmonster':$scope.enctrmonster });
    console.log($scope.enctrmonsters);
  };


  //CREATION OF THE CAMPAIGN JSON OBJECT

  var campaign = {
    'general' : campaigngeneraljson,
    'encounters' : encountersjson
  }
  $scope.createcampaign = function() {

  }

}]);
