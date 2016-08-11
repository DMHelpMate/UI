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

  //Figure out if General is set or not
  $scope.checkGeneral = function () {

  }


//Creating GENERAL-INFO JSON object for a new Campaign
	$scope.campaigngeneraljson = {};
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
    $scope.locations.push({ 
      'lname':$scope.location.lname, 
      'ldiscription':$scope.location.ldiscription 
    });
    console.log($scope.locations);
    $scope.location = {};
  };



//Monsters
  $scope.monsters = [];
  $scope.monster = {};
  $scope.monstersaddrow = function(){  
    var mon_id = localStorage.getItem('user-hash')+'_'+$scope.monster.mname;
    $scope.monsters.push({ 
      'mon_id':mon_id,
      'mname':$scope.monster.mname, 
      'mhitpoints':$scope.monster.mhitpoints, 
      'mattack':$scope.monster.mattack, 
      'mdefence':$scope.monster.mdefence 
    });
    console.log($scope.monsters);
    $scope.monster = {};
  };

  $scope.hidemonsters = function(){
    $scope.addmonsters = !$scope.addmonsters;
    $scope.monsterssaved = true;
  }


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
    var enctid = localStorage.getItem('user-hash')+'_'+encountersjson.title;

    encountersjson.enct_id = enctid;
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


  //Craete Campaign
    // - No more edits
    // - All Tables are Final
    // - Monsters collection gets created
    // - all other collections get created

  //CREATION OF THE CAMPAIGN JSON OBJECT
  $scope.campaigncomplete = true;

  // var campaign = {
  //   'camp_id' : localStorage.getItem('user-hash')+'_'+campaigngeneraljson.title,
  //   'general' : campaigngeneraljson,
  //   'encounters' : []
  // }
  $scope.createcampaign = function() {

  }

}]);
