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
	var locationjson = {
		'name':'',
		'discription':''
	}

	$scope.localname = 'Dungeon of Balls';
	$scope.localdisc = 'There will be lots of balls... everywhere';
    $scope.locationsubmit = function() {
        if ($scope.localname) {
          locationjson.name = this.localname;
        }
        if ($scope.campauthor) {
          locationjson.discription = this.localdisc;
        }
        console.log(locationjson);
    }; 

//Monsters
	var monstersjson = {
		'name':'',
		'hitpoints':'',
		'attack':'',
		'defense':''
	}

	$scope.monstername = 'Dire Balls';
	$scope.monsterhp = '69';
	$scope.monsterat = '96';
	$scope.monsterdf = '80085';
    $scope.monstersubmit = function() {
        if ($scope.monstername) {
          monstersjson.name = this.monstername;
        }
        if ($scope.monsterhp) {
          monstersjson.discription = this.monsterhp;
        }
        if ($scope.monsterat) {
          monstersjson.name = this.monsterat;
        }
        if ($scope.monsterdf) {
          monstersjson.discription = this.monsterdf;
        }
        console.log(monstersjson);
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

}]);