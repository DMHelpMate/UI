angular.module('dm')
.controller('CreateController', ['$http', '$scope', function($http, $scope) {

//set active object (general info)
	$scope.activeClass = 'create-general';
  $scope.selectedencounter = ''; 

//Compare the param to active id
	$scope.isActive = function (id) {;
		return ($scope.activeClass === id);
	};

//Set the active var to an id
	$scope.setActive = function (event) {
    $scope.activeClass = event.target.id;
	};

  //Check if tables are ready to activate
  $scope.checkGeneral = function (event) {
    if ($scope.addgenralinfo) {
      $scope.setActive(event);
    } else {
      alert("Must Save General Info First");
    }
  };

  //Check if encounters are ready to activate
  $scope.checkTables = function (event) {
    if ($scope.locationssaved && $scope.monsterssaved) {
      $scope.setActive(event);
    } else {
      alert("Must Save At least one Monster and Location First");
    }
  };

//Creating GENERAL-INFO JSON object for a new Campaign
  $scope.showgeneralinfo = true;
  $scope.addgenralinfo = false;
  var campid;
	$scope.campaigngeneraljson = {};
  $scope.generalsubmit = function() {
    $scope.campaigngeneraljson.name = this.camptitle;
    campid = localStorage.getItem('user-hash')+'_'+$scope.campaigngeneraljson.name;
    $scope.campaigngeneraljson.author = this.campauthor;
    $scope.campaigngeneraljson.theme = this.camptheme;
    $scope.campaigngeneraljson.description = this.campdisc;
    //Hide the input form and show the results
    $scope.showgeneralinfo = false;
    $scope.addgenralinfo = true;
  };


//Creating JSON object for the Monsters and Locations information for a new Campaign
//Locations
  $scope.locations = [];
  $scope.location = {};
  $scope.locationsaddrow = function() {  
    $scope.locations.push({ 
      'name':$scope.location.name, 
      'description':$scope.location.description 
    });
    $scope.location = {};
  };

//Save and Finish creating locations table
  $scope.hidelocations = function() {
    if ($scope.locations.length > 0) {
      $scope.addlocations = !$scope.addlocations;
      $scope.locationssaved = true;
    }
  };

//Monsters
  $scope.monsters = [];
  $scope.monster = {};
  $scope.savedmonsterrow = false;
  $scope.editmonsterrow = true;
  $scope.monstersaddrow = function() {  
    var mon_id = localStorage.getItem('user-hash')+'_'+$scope.monster.mname;
    $scope.monster = { 
      'mon_id':mon_id,
      'mname':$scope.monster.mname, 
      'mhitpoints':$scope.monster.mhitpoints, 
      'mattack':$scope.monster.mattack, 
      'mdefense':$scope.monster.mdefense 
    };
    $scope.monsters.push($scope.monster);

    var data = $scope.monster;
    console.log(data);
    $scope.monsterssaved = true;
    $http.post('http://api.unicornrampage.com/monsters', data, {headers:{'Content-Type': 'application/json'}}).success(function (data) {
      console.log('success');
    });
    $scope.monster = {};
  };

  $scope.monstersaddpremade = function(pmm) {  
    console.log(pmm);
    $scope.monsters.push(pmm);
    $scope.monsterssaved = true;
    $scope.monster = {};
  };

  $scope.editedmonster; 
  // EDIT a monster in the table
  $scope.editMonster = function(mon) {  
    $scope.savedmonsterrow = true;
    $scope.editmonsterrow = false;
    $scope.monster.selected = angular.copy(mon);
    console.log(mon);
    $scope.editedmonster = mon;
  };

  $scope.saveMonster = function(ind) {
    var temp = $scope.monsters.indexOf($scope.editedmonster);
    console.log('index'+temp);
    $scope.monsters[temp] = angular.copy($scope.monster.selected);
    var newmonster = $scope.monster.selected;
    console.log($scope.monster.selected);
    var data = ind;
    $http.put('http://api.unicornrampage.com/monsters?mon_id='+ data, newmonster, {headers:{'Content-Type': 'application/json'}}).success(function (data) {
      console.log('update success');
    });
    $scope.reset();
  };

  $scope.reset = function () {
    $scope.monster.selected = {};
    $scope.editedmonster = {};
    $scope.savedmonsterrow = false;
    $scope.editmonsterrow = true;
  };

  // DELETE a monster from the table
  $scope.deleteMonster = function(id){ 
    if ($scope.monsters.length === 1) {
          $scope.monsterssaved = false;
    }
    var index = $scope.monsters.indexOf(id);
    $scope.monsters.splice(index, 1);
    var data = id;
    $http.delete('http://api.unicornrampage.com/monsters?mon_id='+ data).success(function (data) {
      console.log('delete success');
    });
  };

  $scope.dbmonsters = true;
  $scope.selectMonster = function(id){ 
    $scope.dbmonsters = false;
    $http.get('http://api.unicornrampage.com/monsters').success(function (data) {
      $scope.databasemonsters = data;
      console.log('get success');
    });
  };


//Creating ENCOUNTERS JSON object for a new Campaign
	$scope.encountersjson = [];
  $scope.encountersview = [];
  $scope.campencounters = [];
  $scope.singleencounter = {};

  $scope.enctrsubmit = function() {
    var temptitle = $scope.singleencounter.title;
    var enctid = localStorage.getItem('user-hash')+'_'+temptitle;
    var monsters = $scope.enctrmonsters;
     $scope.encountersview.push({
      'title':$scope.singleencounter.title,
      'location':$scope.singleencounter.location,
      'notes':$scope.singleencounter.notes,
      'readaloud':$scope.singleencounter.readaloud,
      'monsters':monsters
    });

     var enctgeneral = {
      'name':$scope.singleencounter.title,
      'setup':$scope.singleencounter.notes,
      'readaloud':$scope.singleencounter.readaloud
    };

    $scope.encountersjson.push({
      'enc_id':enctid,
      'general':enctgeneral,
      'location':$scope.singleencounter.location,
      'monsters':monsters,
      'camp_id':campid
    });
    $scope.campencounters.push(enctid);

    var data = $scope.encountersjson;
    $http.post('http://api.unicornrampage.com/encounters', data, {headers:{'Content-Type': 'application/json'}});
    for (i = 0; i < monsters.length; i++) {
       var monsterencounter = {
       'mon_id':monsters[i].mon_id, 
       'enc_id':enctid,
       'quantity':monsters.length
      };
      $http.post('http://api.unicornrampage.com/monsters_encounters', monsterencounter, {headers:{'Content-Type': 'application/json'}});
    }

    $scope.enctrmonsters = [];
    $scope.viewmonsters = [];
    $scope.singleencounter = {};
    $scope.campaigncomplete = false;
  };

  //Add Monsters to the Encounter
  $scope.enctrmonsters = [];
  $scope.viewmonsters = [];
  $scope.enctrmonster = {};
  $scope.monsterencounter = {};
  $scope.checkmonster = function() {  
    if (undefined != this.selectencountermonster && (this.enctrmonsterscount > 0)) {
      $scope.enctrmonsters.push({ 'quantity':this.enctrmonsterscount, 'mon_id':this.selectencountermonster.mon_id });
      $scope.viewmonsters.push({ 'quantity':this.enctrmonsterscount, 'name':this.selectencountermonster.mname });
      $scope.enctrmonster = {};
      this.selectencountermonster = '';
      this.enctrmonsterscount = 0;

    }
  };

  //CREATION OF THE CAMPAIGN JSON OBJECT
  $scope.campaigncomplete = true;

  var campaign = {
    // 'camp_id' : localStorage.getItem('user-hash')+'_'+$scope.campaigngeneraljson.name,
    'camp_id' : campid,
    'general' : $scope.campaigngeneraljson,
    'encounters' : $scope.campencounters
  }
  $scope.createcampaign = function() {
    var data = campaign;
    $http.post('http://api.unicornrampage.com/campaigns', data, {headers:{'Content-Type': 'application/json'}}).success(function (data) {
      console.log('success');
    });
  }

}]);
