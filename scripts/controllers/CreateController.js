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
  $scope.showgeneralinfo = true;
	$scope.campaigngeneraljson = {};
  $scope.generalsubmit = function() {
    $scope.campaigngeneraljson.title = this.camptitle;
    $scope.campaigngeneraljson.author = this.campauthor;
    $scope.campaigngeneraljson.theme = this.camptheme;
    $scope.campaigngeneraljson.discription = this.campdisc;
    console.log($scope.campaigngeneraljson);
    $scope.showgeneralinfo = false;
    $scope.addgenralinfo = true;
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

//Save and Finish creating locations table
  $scope.hidelocations = function(){
    if ($scope.locations.length > 0) {
      $scope.addlocations = !$scope.addlocations;
      $scope.locationssaved = true;
    }
  }

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
      'mdefense':$scope.monster.mdefense 
    });
    console.log($scope.monsters);
    $scope.monster = {};
  };

//Save and Finish creating monsters table, and send the array of monsters to the api for inserting into the db
  $scope.hidemonsters = function(){
    if ($scope.monsters.length > 0) {
      var data = $scope.monsters;
      $scope.addmonsters = !$scope.addmonsters;
      $scope.monsterssaved = true;
      $http.post('http://api.unicornrampage.com/monsters', data, {headers:{'Content-Type': 'application/json'}}).success(function (data) {
        console.log('success');
      });
    }
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
    encountersjson.title = this.enctertitle;
    encountersjson.author = this.encterdmnotes;
    encountersjson.discription = this.encterreadaloud;
    encountersjson.location = this.selectencounterlocation;
    console.log(encountersjson);
    $scope.campaigncomplete = false;
  };

  //Add Monsters to the Encounter
  $scope.enctrmonsters = [];
  $scope.enctrmonster = {};
  $scope.checkmonster = function(){  
    if (undefined != this.selectencountermonster && (this.enctrmonsterscount > 0)) {
      $scope.addmonstertoencounter(this.selectencountermonster, this.enctrmonsterscount);
    }
  };
  $scope.addmonstertoencounter = function(monster, count){  

    console.log("inside add");
    console.log("monster="+ monster);
    console.log("count="+ count);
    
    $scope.enctrmonster.monster = monster;
    $scope.enctrmonster.mcount = count;
    $scope.enctrmonsters.push({ 'enctmonster':$scope.enctrmonster });
    $scope.enctrmonster = {};
    console.log($scope.enctrmonsters);
  };


  //CREATION OF THE CAMPAIGN JSON OBJECT
  $scope.campaigncomplete = true;

  var campaign = {
    'camp_id' : localStorage.getItem('user-hash')+'_'+$scope.campaigngeneraljson.title,
    'general' : $scope.campaigngeneraljson,
    'encounters' : []
  }
  $scope.createcampaign = function() {

  }

}]);
