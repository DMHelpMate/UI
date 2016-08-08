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
$scope.generalcomplete = true;
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
    campaigngeneraljson = {};
  };

//Creating JSON object for the Monsters and Locations information for a new Campaign

//Locations
  $scope.locations = [];
  $scope.location = {};
  $scope.locationsaddrow = function(){  
    $scope.locations.push({ 'lname':$scope.location.lname, 'ldiscription':$scope.location.ldiscription });
    console.log($scope.locations);
    $scope.location = {};
  };



//Monsters
  $scope.monsters = [];
  $scope.monster = {};
  $scope.monstersaddrow = function(){  
    $scope.monsters.push({ 'mname':$scope.monster.mname, 'mhitpoints':$scope.monster.mhitpoints, 'mattack':$scope.monster.mattack, 'mdefence':$scope.monster.mdefence });
    console.log($scope.monsters);
    $scope.monster = {};
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

  $scope.enctrsubmit = function() {
    encountersjson.title = this.enctrname;
    encountersjson.author = this.enctrdmnotes;
    encountersjson.discription = this.enctrreadaloud;
    encountersjson.location = this.selectencounterlocation;
    console.log(encountersjson);
    $scope.campaigncomplete = false;
  };

  //Add Monsters to the Encounter
  $scope.enctrmonsters = [];
  $scope.enctrmonster = {};
  $scope.addmonstertoencounter = function(){  
    $scope.enctrmonster.monster = this.selectencountermonster;
    $scope.enctrmonster.mcount = this.enctrmonsterscount;
    $scope.enctrmonsters.push({ 'enctmonster':$scope.enctrmonster });
    $scope.enctrmonster = {};
    console.log($scope.enctrmonsters);
  };


  //CREATION OF THE CAMPAIGN JSON OBJECT
  $scope.campaigncomplete = true;

  var campaign = {
    //'_id' : ObjectId(localStorage.getItem('user-hash')+”_”+campaign.name),
    'general' : campaigngeneraljson,
    'encounters' : []
  }
  $scope.createcampaign = function() {

  }

}]);
