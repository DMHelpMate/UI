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
      alert("Must Save Monsters and Locations First");
    }
  };

  // $scope.encountersPage = function (selectedencounter) {
  //   //set the view to the saved encounters page and use the data from selectedencounter to populate
  // };

//Creating GENERAL-INFO JSON object for a new Campaign
  $scope.showgeneralinfo = true;
  $scope.addgenralinfo = false;
	$scope.campaigngeneraljson = {};
  $scope.generalsubmit = function() {
    $scope.campaigngeneraljson.title = this.camptitle;
    $scope.campaigngeneraljson.author = this.campauthor;
    $scope.campaigngeneraljson.theme = this.camptheme;
    $scope.campaigngeneraljson.description = this.campdisc;
    console.log($scope.campaigngeneraljson);
    //Hide the input form and show the results
    $scope.showgeneralinfo = false;
    $scope.addgenralinfo = true;
  };


//Creating JSON object for the Monsters and Locations information for a new Campaign
//Locations
  $scope.locations = [];
  $scope.location = {};
  $scope.locationsaddrow = function(){  
    $scope.locations.push({ 
      'name':$scope.location.name, 
      'description':$scope.location.description 
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
  };


//Creating ENCOUNTERS JSON object for a new Campaign
	$scope.encountersjson = [];
  $scope.encountersview = [];
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
    console.log("encounter for view="+JSON.stringify($scope.encountersview));
    $scope.encountersjson.push({
      'enc_id':enctid,
      'general':enctgeneral,
      'location':$scope.singleencounter.location,
      'monsters':monsters
    });
    

    var data = $scope.encountersjson;
    console.log("encounter for data="+JSON.stringify(data));
    $http.post('http://api.unicornrampage.com/encounters', data, {headers:{'Content-Type': 'application/json'}}).success(function (data) {
      console.log('success');
    });
    console.log("Done with Post");

    for (monster in $scope.encountersjson.monsters) {
      console.log("monster="+monster);
      var data = $scope.encountersjson.monsters.monster;
      $http.post('http://api.unicornrampage.com/encounters', data, {headers:{'Content-Type': 'application/json'}}).success(function (data) {
        console.log('success');
      });
    }


    $scope.singleencounter = {};
    $scope.campaigncomplete = false;
    console.log("Encounter after push: "+ JSON.stringify($scope.singleencounter));
    console.log("Array after the push"+ JSON.stringify($scope.encountersjson));
  };

  //Add Monsters to the Encounter
  $scope.enctrmonsters = [];
  $scope.viewmonsters = [];
  $scope.enctrmonster = {};
  $scope.checkmonster = function() {  
    if (undefined != this.selectencountermonster && (this.enctrmonsterscount > 0)) {
      $scope.enctrmonsters.push({ 'quantity':this.enctrmonsterscount, 'mon_id':this.selectencountermonster.mon_id });
      $scope.viewmonsters.push({ 'quantity':this.enctrmonsterscount, 'name':this.selectencountermonster.mname });
      $scope.enctrmonster = {};
      console.log($scope.enctrmonsters);
      console.log("view:"+JSON.stringify($scope.viewmonsters));
    }
  };

  //CREATION OF THE CAMPAIGN JSON OBJECT
  $scope.campaigncomplete = true;

  var campaign = {
    'camp_id' : localStorage.getItem('user-hash')+'_'+$scope.campaigngeneraljson.title,
    'general' : $scope.campaigngeneraljson,
    'encounters' : []
  }
  $scope.createcampaign = function() {
    //push current campaign to the backend for db insert
  }

}]);
